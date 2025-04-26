import { AdminClassifiedsHeader } from "@/components/admin/classifieds/classifieds-header";
import { PageProps } from "@/config/types";

export default async function ClassifiedsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    return <>
    <AdminClassifiedsHeader searchParams={searchParams}/>
    </>
}