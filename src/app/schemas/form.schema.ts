import { MultiStepFormEnum } from "@/config/types";
import { z } from "zod";

export const MultiStepFormSchema = z.object({
  slug: z.string(),
  step: z.nativeEnum(MultiStepFormEnum),
});

export const SelectDateSchema = z.object({
  handoverDate: z.string({ message: "Handover Date is Required" }),
  handoverTime: z.string({ message: "Handover Time is Required" }),
});

export type SelectDateType = z.infer<typeof SelectDateSchema>;
