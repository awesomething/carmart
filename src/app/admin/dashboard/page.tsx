import {auth, clerkClient} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
    // const { userId } = auth;
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-4 text-lg">Welcome to the admin dashboard!</p> */}
        </div>
    );
}