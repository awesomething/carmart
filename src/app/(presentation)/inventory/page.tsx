import { ClassifiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";
import type { AwaitedPageProps, PageProps } from "../../../config/types";
import { prisma } from "../../../lib/prisma";

// Fetch total count of classifieds from the database to display in the header
const count = await prisma.classified.count();

// Fetch classifieds from the database
const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({
    include: { images: true },
  });
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);

  // Since favourites are managed on the client side, pass an empty array
  const favourites: number[] = [];

  return (
    <div className="flex">
      {/* <Sidebar/> */}
      <div className="p-4 flex-1 bg-black">
        <div className="flex space-y-2 flex-col lg:flex-row items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm mb-1 md:text-base lg:text-xl font-semibold min-w-fit">
            We have found {count} classifieds...
            </h2>
            {/* DialogFilters */}
          </div>
      <ClassifiedsList classifieds={classifieds} favourites={favourites} />
      </div>
      </div>
    </div>
  );
}