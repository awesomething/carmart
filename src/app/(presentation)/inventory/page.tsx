import { ClassifiedsList } from "@/components/inventory/classified-list";
import type {
  AwaitedPageProps,
  Favourites,
  PageProps,
} from "../../../config/types";
import { prisma } from "../../../lib/prisma";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { getSourceId } from "@/lib/source-id";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { Sidebar } from "@/components/inventory/sidebar";
import { redis } from "@/lib/redis-store";
import { PageSchema } from "@/app/schemas/page.schema";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import { Suspense } from "react";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import { DialogFilters } from "@/components/inventory/dialog-filters";
import { Loader2 } from "lucide-react";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);
  //get the current page
  const page = validPage ? validPage : 1;

  //calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    include: { images: { take: 1 } },
    where: buildClassifiedFilterQuery(searchParams),
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = getInventory(searchParams);
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });
  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="flex">
      <Sidebar minMaxValues={minMaxResult} searchParams={searchParams} />

      <div className="flex-1 p-4 bg-gray-800">
        <div className="flex space-y-2 items-center justify-between pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              We have found {count} classifieds
            </h2>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-screen">
                  <Loader2 className="animate-spin" />
                </div>
              }
            >

              <DialogFilters
                minMaxValues={minMaxResult}
                count={count}
                searchParams={searchParams}
              />
            </Suspense>

          </div>

          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "justify-end hidden lg:flex",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border-primary active:border text-black",
              paginationLinkActive: "",
            }}
          />
        </div>

        <Suspense fallback={<InventorySkeleton />}>
          <ClassifiedsList
            classifieds={classifieds}
            favourites={favourites ? favourites.ids : []}
          />
        </Suspense>

        <CustomPagination
          baseURL={routes.inventory}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-center lg:hidden pt-12",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border-primary active:border",
            paginationLinkActive: "",
          }}
        />
      </div>
    </div>
  );
}
