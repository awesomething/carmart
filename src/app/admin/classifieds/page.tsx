import { AdminClassifiedsHeader } from "@/components/admin/classifieds/classifieds-header";
import { CreateClassifiedDialog } from "@/components/admin/classifieds/create-classifieds-dialog";
import { PageProps } from "@/config/types";

export default async function ClassifiedsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    return <>
    <AdminClassifiedsHeader searchParams={searchParams}/>
    <CreateClassifiedDialog/>
    </>
}