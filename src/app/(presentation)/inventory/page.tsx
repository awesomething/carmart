import { ClassifiedCard } from "@/components/inventory/classified-card";
import { ClassifiedsList } from "@/components/inventory/classified-list";
import type { AwaitedPageProps, Favourites, PageProps } from "../../../config/types";
import { prisma } from "../../../lib/prisma";
import { z } from "zod"
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { getSourceId } from "@/lib/source-id";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { Sidebar } from "@/components/inventory/sidebar";
import { redis } from "@/lib/redis-store";

const PageSchema = z
  .string()
  .transform((val) => Math.max(Number(val), 1))
  .optional();

const ClassifiedFilterSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  modelVariant: z.string().optional(),
  minYear: z.string().optional(),
  maxYear: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minReading: z.string().optional(),
  maxReading: z.string().optional(),
  currency: z.string().optional(),
  country: z.string().optional(),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  bodyType: z.string().optional(),
  colour: z.string().optional(),
  doors: z.string().optional(),
  seats: z.string().optional(),
  ulezCompliance: z.string().optional(),

});

const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined,
): Prisma.ClassifiedWhereInput => {
  const {data} = ClassifiedFilterSchema.safeParse(searchParams);

  if (!data) return { status: ClassifiedStatus.LIVE };

  const keys = Object.keys(data);

  const taxonomyFilters = ["make", "model", "modelVariant"];

  const mapParamsToFields = keys.reduce((acc, key) => {
    const value = searchParams?.[key] as string | undefined;
    if (!value) return acc;

    if (taxonomyFilters.includes(key)) {
      acc[key] = { id: Number(value) };
    }

    return acc;
  }, {} as { [key: string]: any });

  return {
    status: ClassifiedStatus.LIVE,

    ...(searchParams?.q && {
      OR: [
        {
          title: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields
  };
};


const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page)
  //get the current page
  const page = validPage ? validPage : 1;

  //calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;
  return prisma.classified.findMany({
    include: { images: {take:1} },
    where: buildClassifiedFilterQuery(searchParams),
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
    // orderBy: { createdAt: "desc" },
  });
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count({
  where: buildClassifiedFilterQuery(searchParams),
	});
  const minMaxResult = await prisma.classified.aggregate({
		where: {},
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
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE)

  return (
    <div className="flex">
			<Sidebar minMaxValues={minMaxResult} searchParams={searchParams} params={{}} />

			<div className="flex-1 p-4 bg-black">
				<div className="flex space-y-2 items-center justify-between pb-4 -mt-1">
					<div className="flex justify-between items-center w-full">
						<h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
							We have found {count} classifieds
						</h2>
						
					</div>
					<CustomPagination
						baseURL={routes.inventory}
						totalPages={totalPages}
						styles={{
							paginationRoot: "justify-end hidden lg:flex",
							paginationPrevious: "",
							paginationNext: "border-primary",
							paginationLink: "border-gray-300 active:border text-white hover:border-primary",
							paginationLinkActive: "",
						}}
					/>
				</div>

			
					<ClassifiedsList
						classifieds={classifieds}
						favourites={favourites ? favourites.ids : []}
					/>
			

				<CustomPagination
					baseURL={routes.inventory}
					totalPages={totalPages}
					styles={{
						paginationRoot: "justify-center lg:hidden pt-12",
						paginationPrevious: "",
						paginationNext: "",
						paginationLink: "border-none active:border",
						paginationLinkActive: "",
					}}
				/>
			</div>
		</div>
  );
}