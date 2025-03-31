"use client";

import { MultiStepFormComponentProps, MultiStepFormEnum } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { formatDate } from "date-fns";
import {
  SubmitDetailsSchema,
  SubmitDetailsSchemaType,
} from "@/app/schemas/customer.schema";
import { createCustomerAction } from "@/app/_actions/customer";
import { toast } from "@/hooks/use-toast";
import { routes } from "@/config/routes";


export const SubmitDetails = (props: MultiStepFormComponentProps) => {
  const { params, searchParams } = props;
  const router = useRouter();
  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      terms: "false",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const url = new URL(window.location.href);
      url.searchParams.set("step", MultiStepFormEnum.SELECT_DATE.toString());
      router.push(url.toString());
    });
  };
  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = (data) => {
    startTransition(async () => {
      const valid = await form.trigger();
      if (!valid) return;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const handoverDate = decodeURIComponent(
        searchParams?.handoverDate as string
      );
      const handoverTime = decodeURIComponent(
        searchParams?.handoverTime as string
      );
      const date = formatDate(handoverDate, handoverTime);

      const { success, message } = await createCustomerAction({
        slug: params?.slug as string,
        date,
        ...data,
      });
      if (!success) {
        toast({
          title: "Error",
          description: message,
          type: "background",
          duration: 3000,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success",
        description: message,
        type: "background",
        duration: 1000,
      })

      setTimeout(() =>{
        router.push(routes.success(params?.slug as string))
      }, 1000)
    });
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto bg-white flex flex-col rounded-b-lg shadow-lg p-6 h-96"
        onSubmit={form.handleSubmit(onSubmitDetails)}
      >
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">Enter First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Enter Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Enter Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="mobile">Enter Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="terms"
              render={({ field: { ref, onChange, ...rest } }) => (
                <FormItem className="flex items-center gap-x-2">
                  <FormControl>
                    <Checkbox
                      className="cursor-pointer m-0"
                      onCheckedChange={(e) => onChange(e ? "true" : "false")}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="terms"
                    className="text-sm peer-disabled:cursor-not-allowed leading-none peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </FormLabel>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-x-4">
          <Button
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
            type="button"
            onClick={prevStep}
            disabled={isPrevPending}
          >
            {isPrevPending ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            ) : null}{" "}
            Previous Step
          </Button>
          <Button
            className="uppercase font-bold flex gap-x-3 w-full flex-1"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            ) : null}{" "}
            Submit Details
          </Button>
        </div>
      </form>
    </Form>
  );
};
