import { ClassifiedFilterSchema } from "@/app/schemas/classified.schema";
import { AwaitedPageProps } from "@/config/types";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const buildClassifiedFilterQuery = (
	searchParams: AwaitedPageProps["searchParams"] | undefined,
): Prisma.ClassifiedWhereInput => {
	const { data } = ClassifiedFilterSchema.safeParse(searchParams);

	if (!data) return { status: ClassifiedStatus.LIVE };

	const keys = Object.keys(data);

	const taxonomyFilters = ["make", "model", "modelVariant"];

	const rangeFilters = {
		minYear: "year",
		maxYear: "year",
		minPrice: "price",
		maxPrice: "price",
		minReading: "odoReading",
		maxReading: "odoReading",
	};

	const numFilters = ["seats", "doors"];
	const enumFilters = [
		"odoUnit",
		"currency",
		"transmission",
		"bodyType",
		"fuelType",
		"colour",
		"ulezCompliance",
	];

	const mapParamsToFields = keys.reduce(
		(acc, key) => {
			const value = searchParams?.[key] as string | undefined;
			if (!value) return acc;

			if (taxonomyFilters.includes(key)) {
				acc[key] = { id: Number(value) };
			} else if (enumFilters.includes(key)) {
				acc[key] = value.toUpperCase();
			} else if (numFilters.includes(key)) {
				acc[key] = Number(value);
			} else if (key in rangeFilters) {
				const field = rangeFilters[key as keyof typeof rangeFilters];
				acc[field] = acc[field] || {};
				if (key.startsWith("min")) {
					acc[field].gte = Number(value);
				} else if (key.startsWith("max")) {
					acc[field].lte = Number(value);
				}
			}

			return acc;
		},
		{} as { [key: string]: any },
	);

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
		...mapParamsToFields,
	};
};