"use client";

import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatTransmission,
  formatUlezCompliance,
  generateYears,
} from "@/lib/utils";
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from "@prisma/client";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InputSelect } from "../ui/input-select";
import { NumberInput } from "../ui/number-input";
import { Select } from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { TaxonomySelects } from "./taxonomy-selects";

const RichTextEditor = dynamic(
  () => import("./rich-text-editor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2 flex flex-col">
        <Skeleton className="w-24 h-4 bg-primary-800" />
        <Skeleton className="h-[200px] w-full bg-primary-800" />
      </div>
    ),
  }
);

const years = generateYears(1925);

export const ClassifiedFormFields = () => {
  const form = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
      <FormField
        control={form.control}
        name="year"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="year">Year</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={years.map((year) => ({
                  label: year,
                  value: year,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TaxonomySelects />
      <InputSelect
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
        label="Price"
        inputName="price"
        selectName="currency"
        inputMode="numeric"
        placeholder="0"
        className="h-10 !bg-black"
      />

      <InputSelect
        options={Object.values(OdoUnit).map((value) => ({
          label: value,
          value,
        }))}
        label="Odometer Reading"
        inputName="odoReading"
        selectName="odoUnit"
        inputMode="numeric"
        placeholder="0"
        className="h-10 !bg-black"
      />

      <FormField
        control={form.control}
        name="transmission"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="transmission">Transmission</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(Transmission).map((value) => ({
                  label: formatTransmission(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fuelType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="fuelType">Fuel Type</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(FuelType).map((value) => ({
                  label: formatFuelType(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bodyType"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="bodyType">Body Type</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(BodyType).map((value) => ({
                  label: formatBodyType(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="colour"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="colour">Colour</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(Colour).map((value) => ({
                  label: formatColour(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ulezCompliance"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="ulezCompliance">ULEZ Compliance</FormLabel>
            <FormControl>
              <Select
                label={""}
                selectClassName="text-muted/75 bg-primary-800 border-transparent"
                options={Object.values(ULEZCompliance).map((value) => ({
                  label: formatUlezCompliance(value),
                  value,
                }))}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vrm"
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="vrm">Vehicle Registration Mark</FormLabel>
            <FormControl>
              <Input
                placeholder="LA16 PYW"
                className="uppercase text-gray-400 h-10 mt-1 bg-black placeholder:text-muted/75"
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="doors"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="doors">Doors</FormLabel>
            <FormControl>
              <NumberInput
                max={6}
                min={1}
                placeholder="0"
                style={{ background: "#081a2b" }}
                className="text-gray-400 placeholder:text-muted/75 !bg-black"
                onValueChange={(values: { floatValue: any }) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="seats"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel htmlFor="seats">Seats</FormLabel>
            <FormControl>
              <NumberInput
                max={8}
                min={1}
                placeholder="0"
                style={{ background: "#081a2b" }}
                className="text-gray-400 placeholder:text-muted/75 !bg-black"
                onValueChange={(values: { floatValue: any }) => {
                  onChange(values.floatValue);
                }}
                {...rest}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  label="Description"
                  config={{
                    init: { placeholder: "Enter your vehicle's description" },
                  }}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
