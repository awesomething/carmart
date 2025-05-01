"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import {
  StreamableSkeleton,
  StreamableSkeletonProps,
} from "./streamable-skeletons";
import { readStreamableValue, useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/_actions/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SingleImageSchema,
  SingleImageType,
} from "@/app/schemas/images.schema";
import { ClassifiedAISchema } from "@/app/schemas/classified-ai.schema";
import { z } from "zod";
import { createClassifiedAction } from "@/app/_actions/classified";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { ImageUploader } from "./single-image-uploader";

export const CreateClassifiedDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, startUploadTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();
  const { generateClassifieds } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();

  const imageForm = useForm<SingleImageType>({
    resolver: zodResolver(SingleImageSchema),
  });

  const createForm = useForm<StreamableSkeletonProps>({
    resolver: zodResolver(
      ClassifiedAISchema.extend({
        make: z.object({
          id: z.number().int(),
          name: z.string(),
          image: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      })
    ),
  });

  const handleImageUpload = (url: string) => {
    imageForm.setValue("image", url);
  };

  const onImageSubmit: SubmitHandler<SingleImageType> = async (data) => {
    const responseMessage = await generateClassifieds(data.image);
    if (!responseMessage) return;
    setMessages((currentMessages) => [...currentMessages, responseMessage]);
    for await (const value of readStreamableValue(responseMessage.classified)) {
      if (value) createForm.reset(value);
    }
  };

  const onCreateSubmit: SubmitHandler<StreamableSkeletonProps> = (data) => {
    startCreateTransition(async () => {
      setMessages([]);
      const { success, message } = await createClassifiedAction(data);

      if (!success) {
        toast({
          title: "Error",
          description: message,
          type: "background",
          duration: 2500,
          variant: "destructive",
        });
        return;
      }
    });
  };

  return (
    <Dialog open={true} onOpenChange={() => null}>
      <DialogTrigger asChild>
      <Button className="ml-4" size="sm">
        Create New
      </Button>
      </DialogTrigger>
      <DialogContent
      className={cn(
        messages.length ? "max-w-7xl" : "max-w-6xl"
      )}
      >
      <DialogHeader>
        <DialogTitle>Create New Classified</DialogTitle>
      </DialogHeader>
      {messages.length ? (
        <Form {...createForm}>
        <form
          onSubmit={createForm.handleSubmit(onCreateSubmit)}
          className="space-y-4"
        >
          {messages.map((message) => (
          <div key={message.id} className="w-full">
            {message.display}
          </div>
          ))}
          <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-x-2"
            type="submit"
            disabled={isCreating || isUploading}
            // onClick={}
          >
            {isCreating || isUploading ? (
            <Loader2 className="animate-spin h-4 w-4" />
            ) : null}
            {isUploading ? "Uploading..." : "Create"}
          </Button>
          </div>
        </form>
        </Form>
      ) : (
        <Form {...imageForm}>
        <form
          onSubmit={imageForm.handleSubmit(onImageSubmit)}
          className="space-y-4"
        >
          <ImageUploader onUploadComplete={handleImageUpload} />
          <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-x-2"
            type="submit"
            disabled={isUploading}
          >
            {isUploading && <Loader2 className="animate-spin h-4 w-4" />}
            Upload
          </Button>
          </div>
        </form>
        </Form>
      )}
      </DialogContent>
    </Dialog>
  );
};
