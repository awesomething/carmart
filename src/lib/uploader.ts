import { MAX_IMAGES } from "@/config/constants";
import { endpoints } from "@/config/endpoints";
import type { ProgressArgs } from "@/config/types";
import { api } from "./api-client";

// Interface for uploader options
interface UploaderOptions {
  file: File;
  uuid: string;
  chunkSize?: number;
  threadsQuantity?: number;
}

// Interface for file parts used in multipart upload
interface FilePart {
  PartNumber: number;
  ETag: string;
  signedUrl: string;
}

// Uploader class handles the multipart upload process
export class Uploader {
  chunkSize: number; // Size of each chunk to be uploaded
  threadsQuantity: number; // Number of parallel uploads
  file: File | null; // File to be uploaded
  uuid: string; // Unique identifier for the upload
  uploadedSize: number; // Total size of uploaded data
  progressCache: any; // Cache for tracking upload progress
  activeConnections: any; // Active upload connections
  counter: number; // Counter for tracking progress
  aborted: boolean; // Flag to indicate if the upload is aborted
  parts: FilePart[]; // Parts of the file to be uploaded
  uploadedParts: FilePart[]; // Successfully uploaded parts
  fileId: string | undefined; // File ID from the server
  fileKey: string | undefined; // File key from the server
  onProgressFn: (progressArgs: ProgressArgs) => void; // Callback for progress updates
  onErrorFn: (error?: Error) => void; // Callback for errors
  onCompleteFn: () => void; // Callback for completion

  constructor(options: UploaderOptions) {
    // Initialize uploader with options
    this.chunkSize = options.chunkSize || 1024 * 1024 * 5; // Default chunk size is 5MB
    this.threadsQuantity = Math.min(options.threadsQuantity || MAX_IMAGES, 50); // Limit threads to 50
    this.file = options.file;
    this.uuid = options.uuid;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.counter = 0;
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = undefined;
    this.fileKey = undefined;
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.onCompleteFn = () => {};
  }

  // Start the upload process
  start() {
    this.initUpload();
  }

  // Initialize the upload by requesting pre-signed URLs and preparing parts
  async initUpload() {
    try {
      // Generate a sanitized file name
      const ext = this.file?.name.split(".").pop();
      const name = this.file?.name.split(".").shift();
      let fileName = "";

      if (ext) {
        fileName += `${name?.replace(/\s+/g, "-")}.${ext}`;
      } else fileName += name;

      // Request initialization of multipart upload
      const imageInitialisationUploadInput = {
        name: fileName,
        uuid: this.uuid,
      };

      const AWSFileDataOutput = await api.post<{
        fileId: string;
        fileKey: string;
      }>(endpoints.images.initMultipartUpload, {
        json: imageInitialisationUploadInput,
      });

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;

      // Calculate the number of parts and request pre-signed URLs
      const numberOfParts = Math.ceil(Number(this.file?.size) / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfParts,
      };

      const urlsResponse = await api.post<{ parts: FilePart[] }>(
        endpoints.images.getMultipartUpload,
        {
          json: AWSMultipartFileDataInput,
        }
      );

      // Store the parts and start uploading
      const newParts = urlsResponse.parts;
      this.parts.push(...newParts);
      this.sendNext();
    } catch (error) {
      await this.complete(error as Error);
    }
  }

  // Send the next chunk of the file
  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;
    if (activeConnections >= this.threadsQuantity) {
      return; // Limit active connections to the specified threads quantity
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete(); // Complete the upload if all parts are uploaded
      }
      return;
    }

    const part = this.parts.pop();

    if (this.file && part) {
      // Calculate the byte range for the current chunk
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(
        sentSize,
        sentSize + this.chunkSize
      ) as File;

      // Start uploading the chunk
      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error: Error) => {
          this.parts.push(part); // Requeue the part on failure
          this.complete(error);
        });
    }
  }

  // Send a single chunk to the server
  sendChunk(chunk: File, part: FilePart, sendChunkStarted: () => void) {
    return new Promise((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error("Failed chunk upload"));
            return;
          }

          resolve(status);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Upload a chunk using a pre-signed URL
  upload(file: File, part: FilePart, sendChunkStarted: () => void) {
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        const partNumberIndex = part.PartNumber - 1;
        this.activeConnections[partNumberIndex] = new XMLHttpRequest();
        const xhr: XMLHttpRequest = this.activeConnections[partNumberIndex];

        sendChunkStarted();

        // Track upload progress
        const progressListener = this.handleUploadProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener("progress", progressListener);
        xhr.addEventListener("error", progressListener);
        xhr.addEventListener("abort", progressListener);
        xhr.addEventListener("loadend", progressListener);

        xhr.open("PUT", part.signedUrl);

        // Handle successful upload
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader("ETag");

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ""),
              } as FilePart;

              this.uploadedParts.push(uploadedPart);
              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        // Handle errors and aborts
        xhr.onerror = (error: any) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };
        xhr.onabort = (error: any) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  // Handle upload progress and update progress cache
  handleUploadProgress(part: number, event: ProgressEvent) {
    if (this.file) {
      if (["progress", "error", "abort"].includes(event.type)) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === "uploaded") {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      // Calculate and report progress
      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => memo + this.progressCache[id], 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);
      const total = this.file.size;
      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent,
        total,
        percentage,
        key: this.fileKey as string,
        uuid: this.uuid,
      });
    }
  }

  // Complete the upload process
  async complete(error?: Error) {
    if (error) {
      this.onErrorFn(error); // Handle errors
      return;
    }

    try {
      await this.sendCompleteRequest(); // Finalize the upload
    } catch (error) {
      this.onErrorFn(error as Error);
    }

    this.onCompleteFn(); // Notify completion
  }

  // Send a request to finalize the multipart upload
  async sendCompleteRequest() {
    try {
      if (this.fileId && this.fileKey) {
        const imageFinalisationMultipartInput = {
          fileId: this.fileId,
          fileKey: this.fileKey,
          parts: this.uploadedParts,
        };

        const result = await api.post(
          endpoints.images.finaliseMultipartUpload,
          {
            json: imageFinalisationMultipartInput,
          }
        );

        return result;
      }
    } catch (error) {
      console.log("Complete request issue:", error);
    }
  }

  // Set a callback for progress updates
  onProgress(onProgress: any) {
    this.onProgressFn = onProgress;
    return this;
  }

  // Set a callback for errors
  onError(onError: any) {
    this.onErrorFn = onError;
    return this;
  }

  // Set a callback for completion
  onComplete(onComplete: any) {
    this.onCompleteFn = onComplete;
    return this;
  }

  // Abort the upload process
  abort() {
    for (const id in this.activeConnections) {
      this.activeConnections[id].abort();
    }
    this.aborted = true;
  }
}
