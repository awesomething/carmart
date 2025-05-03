import { RadioFilter } from "@/components/shared/radio-filter"
import type { AwaitedPageProps } from "@/config/types"
import { ClassifiedStatus } from "@prisma/client"
import { CreateClassifiedDialog } from "./create-classifieds-dialog"
export const AdminClassifiedsHeader = ({
    searchParams,
}: AwaitedPageProps)=>{
    return <div className="flex flex-col p-6 space-y-4 text-gray-400">
        <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg md:text-2xl">All Classifieds</h1>
            <div className="flex items-center justify-between">
                <RadioFilter searchParams={searchParams} items={["All", ...Object.values(ClassifiedStatus)]} />
               
                <CreateClassifiedDialog/>
            </div>
        </div>
    </div>
}