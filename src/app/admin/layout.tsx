import { AdminHeader } from "@/components/layouts/admin-header";
import { AdminSidebar } from "@/components/layouts/admin-sidebar";
import { PropsWithChildren, Suspense } from "react";
import { AI } from "../_actions/ai";
import { Loader2 } from "lucide-react";

export default async function AdminLayout({children}: PropsWithChildren){
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><Loader2 className="w-10 h-10 animate-spin text-gray-500" /></div>}> 
        <AI>
        <
        div className="flex bg-gray-800 min-h-screen w-full justify-center">
        <AdminSidebar/>
        <div className="flex flex-col flex-1 overflow-hidden">
           <AdminHeader/>
            <main className="admin-scrollbar flex flex-1 flex-col gap-4 md:gap-8 p-4 md:p-6 overflow-auto">
                {children}
            </main>
        </div>
    </div>
    </AI>
    
    </Suspense>)

}