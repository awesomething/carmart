"use client";

import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { CircleCheckIcon, CircleX, Loader2 } from "lucide-react";
import { signInAction } from "@/app/_actions/sign-in";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full uppercase font-bold"
    >
      {pending && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{" "}
      Sign In
    </Button>
  );
};

export const SignInForm = () => {
  const [state, formAction] = useActionState(signInAction, {
    success: false,
    message: "",
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      router.refresh();
    //   router.push(routes.challenge);
    }
  }, [state, router]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-800">
      <div className="max-w-md w-full pb-60">
        <form
          ref={formRef}
          action={formAction}
          className="border-gray-600 border p-10 shadow-lg rounded-md bg-black"
        >
          <div className="flex items-center mb-6 justify-center">
            <h2 className="uppercase text-2xl font-bold">Admin Sign In</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-300"
              >
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className=" placeholder:text-gray-500"
                placeholder="Enter your Admin Email Address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-300"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                className=" placeholder:text-gray-500"
                placeholder="Enter your Admin Password"
                required
              />
            </div>

            <div className="my-6">
              <p className="text-sm text-gray-600-mb-2 text-center">
                <b>This is for admin only!</b>
              </p>
            </div>
            <div className="space-y-4">
              <SubmitButton />
              {state.success && (
                <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
                  <CircleCheckIcon className="h-5 w-5" />
                  <span>Success!{state.message}</span>
                </div>
              )}

              {!state.success && state.message && (
                <div className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white">
                  <CircleX className="h-5 w-5" />
                  <span>Error! {state.message}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
