import { InitialiseMultipartUploadSchema, SingleImageUploadSchema } from "@/app/schemas/images.schema";
import { getAuth } from "@clerk/nextjs/server";
import { env } from "@/env";
import { forbidden } from "next/navigation";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { s3, uploadToS3 } from "@/lib/s3";
import { CreateMultipartUploadCommandInput } from "@aws-sdk/client-s3";

export const maxDuration = 300;

export const POST = async (req: Request) => {
  const { userId } = getAuth(req as NextRequest);

  try {
    if (!userId) {
      forbidden();
    }
    const data = await req.json();
	const validated = InitialiseMultipartUploadSchema.safeParse(data);
	if(!validated.success) return NextResponse.error();

	const {name, uuid}  = validated.data;

	const key = `uploads/${uuid}/${name}`;

const { default: mimetype } = await import("mime-types");

		const mime = mimetype.lookup(name);

		const multipartParams: CreateMultipartUploadCommandInput = {
			Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
			Key: key.replace(/\s+/g, "-"),
			...(mime && { ContentType: mime }),
		};

		const { CreateMultipartUploadCommand } = await import("@aws-sdk/client-s3");

		const command = new CreateMultipartUploadCommand(multipartParams);

		const multipartUpload = await s3.send(command);

		return NextResponse.json(
			{
				fileId: multipartUpload.UploadId,
				fileKey: multipartUpload.Key,
			},
			{ status: 200 },
		);
  } catch (err) {
	console.log(`Error in initialising multipart upload: ${err}`);
		return NextResponse.error();
  }
};
