import { ClassifiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";
import type { AwaitedPageProps, PageProps } from "../../../config/types";
import { prisma } from "../../../lib/prisma";
import { Pagination } from "@/components/ui/pagination";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { z } from "zod";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { Sidebar } from "@/components/inventory/sidebar";

// Fetch total count of classifieds from the database to display in the header
const count = await prisma.classified.count({
  where: {},
});

const PageSchema = z.string().transform((val)=> Math.max(Number(val), 1)).optional();

// Fetch classifieds from the database
const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page); 
  //get the current page
  const page = validPage ? validPage : 1;

  //calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    include: { images: {take:1} },
    where: {},
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);

  // Since favourites are managed on the client side, pass an empty array
  const favourites: number[] = [];
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE)

  return (
    <div className="flex">
      <Sidebar minMaxValues={null} searchParams={searchParams} params={{}} />
      <div className="p-4 flex-1 bg-black">
        <div className="flex space-y-2 flex-col items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm mb-1 md:text-base lg:text-xl font-semibold min-w-fit">
            We have found {count} classifieds...
            </h2>
            {/* DialogFilters */}
          </div>
          <CustomPagination baseURL={routes.inventory} totalPages={totalPages} styles={{
            paginationRoot: " justify-end",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "",
            paginationLinkActive: ""
          }}/>
      <ClassifiedsList classifieds={classifieds} favourites={favourites} />
      </div>
      </div>
    </div>
  );
}