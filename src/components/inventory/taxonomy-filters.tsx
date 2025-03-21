"use client";

import type { AwaitedPageProps } from "@/config/types";
import { useEffect, useState, type ChangeEvent } from "react";
import { Select } from "../ui/select";
import { endpoints } from "@/config/endpoints";

interface TaxonomyFiltersProps extends AwaitedPageProps {
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

type filterOptions<LType, VType> = Array<{
      label: LType;
      value: VType;
}>;

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
    const { searchParams, handleChange } = props;

    const [makes , setMakes] = useState<filterOptions< string, string>>([]);
    const [models , setModels] = useState<filterOptions< string, string>>([]);
    const [modelVariants , setModelVariants] = useState<
    filterOptions< string, string>
    >([]);

    useEffect(() => {
        (async function fetchMakesOptions() {
            const params = new URLSearchParams();
            for (const [k, v] of Object.entries(
                searchParams as Record<string, string>
            )) {
                if (v) params.set(k, v as string);
            }
    
            const url = new URL(endpoints.taxonomy, window.location.href)

            url.search = params.toString();

            const data = await api.get<{
                makes: filterOptions<string, string>;
                models: filterOptions<string, string>,
                modelVariants: filterOptions<string, string>,
            }>(url.toString());

            setMakes(data.models);
            setModels(data.models);
            setModelVariants(data.modelVariants);
        })();
    }, [searchParams]);
    


    return <>
        <Select
            label="Make"
            name="make"
            value={searchParams?.make as string}
            options={makes}
            onChange={handleChange}
        />

        <Select
            label="Model"
            name="model"
            value={searchParams?.model as string}
            options={models}
            onChange={handleChange}
            disabled={!models.length}
        />
        <Select
            label="Model Variant"
            name="modelVariant"
            value={searchParams?.model as string}
            options={modelVariants}
            onChange={handleChange}
            disabled={!modelVariants.length}
        />


    </>
};
