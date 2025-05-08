import { FormHeader } from "@/components/reserve/form-header";
import { PropsWithChildren } from "react";

export default function MultiStepFormLayout({ children }: PropsWithChildren) {
    return (
        <main className="w-full min-h-screen bg-gray-800">
            <div className="w-full mx-auto p-8 sm:p-10 md:p-12">
                
                <div className="max-w-4xl mx-auto">
                <FormHeader />
                    {children}</div>
            </div>
        </main>
    );
}