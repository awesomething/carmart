import { AdminHeader } from "@/components/layouts/admin-header";
import { AdminSidebar } from "@/components/layouts/admin-sidebar";
import { PropsWithChildren } from "react";

export default async function AdminLayout({children}: PropsWithChildren){
    return <div className="flex bg-gray-800 min-h-screen w-full justify-center">
        <AdminSidebar/>
        <div className="flex flex-col flex-1 overflow-hidden">
           <AdminHeader/>
            <main className="admin-scrollbar flex flex-1 flex-col gap-4 md:gap-8 p-4 md:p-6 overflow-auto">
                {children}
            </main>
        </div>
    </div>
}