"use client";

// import { logoutOfAllSessions } from "@/app/_actions/sign-out";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";


export const SettingsPageContent = () => {
  return (
    <div className="divide-y divide-white/5 px-6">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-500">
            Log out of all sessions
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This will log out out of all of your sessions across all of your
            devices of which you are currently logged into.
          </p>
        </div>

        <SignOutButton>
          <Button className=" flex items-center justify-center font-bold ">Sign Out</Button>
        </SignOutButton>
      </div>
    </div>
  );
};
