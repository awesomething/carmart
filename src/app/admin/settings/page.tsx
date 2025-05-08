import { SettingsPageContent } from "@/components/settings/content";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";


export default function SettingsPage() {
    return (
        <>
            <div className="flex flex-col p-6 text-gray-500">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-lg md:text-2xl">
                        Account Settings
                    </h1>
                </div>
            </div>
        <Suspense
                fallback={
                  <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin" />
                  </div>
                }
              >
      <SettingsPageContent />
      </Suspense>    
        </>
    );
}