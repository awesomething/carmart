import { endOfMonth, startOfMonth, subMonths } from "date-fns";


export default function AdminDashboardPage() {
    const now = new Date();
    const startOfThisMonth = startOfMonth(now);
    const endOfThisMonth = endOfMonth(now);
    const startOfLastMonth = startOfMonth(subMonths(now, 1))
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            
        </div>
    );
}