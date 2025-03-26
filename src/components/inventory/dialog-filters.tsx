"use client";
import { SidebarProps } from "@/config/types";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { ChangeEvent, useEffect, useState } from "react";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { routes } from "@/config/routes";
import { env } from "@/env";
import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { Select } from "../ui/select";
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils";
import { RangeFilter } from "./range-filters";
import { TaxonomyFilters } from "./taxonomy-filters";
import { SearchInput } from "../shared/search-input";

interface DialogFiltersProps extends SidebarProps {
  count: number;
}

export const DialogFilters = (props: DialogFiltersProps) => {
  const { minMaxValues, searchParams, count } = props;

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const { _min, _max } = minMaxValues;
  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      colour: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
      ulezCompliance: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    }
  );

  const clearFilters = () => {
      const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
      router.replace(url.toString());
      setFilterCount(0);
    };

  useEffect(() => {
    const filterCount = Object.entries(
      searchParams as Record<string, string>
    ).filter(([key, value]) => key !== "page" && value).length;

    setFilterCount(filterCount);
  }, [searchParams]);



  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setQueryStates({
      [name]: value || null,
    });

    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }

    router.refresh();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="lg:hidden" variant="outline" size="icon">
          <Settings2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] h-[90vh] overflow-y-auto rounded-xl bg-black">
        <div className="space-y-6">
        <div>
          <div className="text-lg font-semibold flex justify-between">
            <DialogTitle>Filters</DialogTitle>
            
          </div>
          
            <SearchInput
              placeholder="Search classifieds..."
              className="w-full px-3 py-2 border rounded-md focus:outline-hidden 
            focus:ring-2 focus:ring-blue-500"
            />
    
          <div className="space-y-2">
            <TaxonomyFilters
              searchParams={searchParams}
              handleChange={handleChange}
              params={{}}
            />

            <RangeFilter
              label="Year"
              minName="minYear"
              maxName="maxYear"
              defaultMax={_max.year || new Date().getFullYear()}
              defaultMin={_min.year || 1925}
              handleChange={handleChange}
              searchParams={searchParams}
              params={{}}
            />
            <RangeFilter
              label="Price"
              minName="minPrice"
              maxName="maxPrice"
              defaultMax={_max.price || 21474836}
              defaultMin={_min.price || 0}
              handleChange={handleChange}
              searchParams={searchParams}
              increment={1000000}
              thousandsSeparator
              params={{}}
              currency={{
                currencyCode: "USD",
              }}
            />
            <RangeFilter
              label="Odometer Reading"
              minName="minReading"
              maxName="maxReading"
              defaultMax={_max.odoReading || 1000000}
              defaultMin={_min.odoReading || 0}
              handleChange={handleChange}
              searchParams={searchParams}
              params={{}}
              increment={5000}
              thousandsSeparator
            />
            <Select
              label="Currency"
              name=""
              value={queryStates.currency || ""}
              options={Object.values(CurrencyCode).map((value) => ({
                label: value,
                value,
              }))}
              onChange={handleChange}
            />

            <Select
              label="Odometer Unit"
              name="odoUnit"
              value={queryStates.odoUnit || ""}
              options={Object.values(OdoUnit).map((value) => ({
                label: formatOdometerUnit(value),
                value,
              }))}
              onChange={handleChange}
            />

            <Select
              label="Transmission"
              name="transmission"
              value={queryStates.transmission || ""}
              options={Object.values(Transmission).map((value) => ({
                label: formatTransmission(value),
                value,
              }))}
              onChange={handleChange}
            />
            <Select
              label="Fuel Type"
              name="fuelType"
              value={queryStates.fuelType || ""}
              options={Object.values(FuelType).map((value) => ({
                label: formatFuelType(value),
                value,
              }))}
              onChange={handleChange}
            />
            <Select
              label="Body Type"
              name="bodyType"
              value={queryStates.bodyType || ""}
              options={Object.values(BodyType).map((value) => ({
                label: formatBodyType(value), //format bodyType function
                value,
              }))}
              onChange={handleChange}
            />
            <Select
              label="Colour"
              name="colour"
              value={queryStates.colour || ""}
              options={Object.values(Colour).map((value) => ({
                label: formatColour(value),
                value,
              }))}
              onChange={handleChange}
            />
            <Select
              label="ULEZ Compliance"
              name="ulezCompliance"
              value={queryStates.ulezCompliance || ""}
              options={Object.values(ULEZCompliance).map((value) => ({
                label: formatUlezCompliance(value), //format UlezCompliance
                value,
              }))}
              onChange={handleChange}
            />

            <Select
              label="Doors"
              name="doors"
              value={queryStates.doors || ""}
              options={Array.from({ length: 6 }).map((_, i) => ({
                label: Number(i + 1).toString(),
                value: Number(i + 1).toString(),
              }))}
              onChange={handleChange}
            />
            <Select
              label="Seats"
              name="seats"
              value={queryStates.seats || ""}
              options={Array.from({ length: 8 }).map((_, i) => ({
                label: Number(i + 1).toString(),
                value: Number(i + 1).toString(),
              }))}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
            <Button type= "button" className="w-full" onClick={()=>setIsOpen(false)}>
                Search ({count > 0 ? `${count}` : null})
            </Button>
            {filterCount > 0 && (
                <Button type="button" variant="outline" onClick={clearFilters} aria-disabled={!filterCount}
                className={cn(
                    "text-sm py-1", !filterCount ? "disabled opacity-50 pointer-events-none cursor-default": "hover:underline"
                )}>
                    Clear all {filterCount ? `($(filterCount))`: null}
                </Button>
            )}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
