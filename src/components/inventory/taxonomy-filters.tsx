"use client";

import type { AwaitedPageProps } from "@/config/types";
import { useState, type ChangeEvent } from "react";
import { Select } from "../ui/select";

interface TaxonomyFiltersProps extends AwaitedPageProps {
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

type filterOptions<LType, VType> = Array<{
      label: LType;
      value: VType;
}>;

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
    const { searchParams, ...rest } = props;

    const [makes , setMakes] = useState<filterOptions< string, string>>([]);
    const [models , setModels] = useState<filterOptions< string, string>>([]);
    const [modelVariants , setModelVariants] = useState<
    filterOptions< string, string>
    >([]);

    return <>
        <Select
            label="Make"
            name="make"
            value={searchParams?.make as string}
            options={[]}
            onChange={() => null}
        />

        <Select
            label="Model"
            name="model"
            value={searchParams?.model as string}
            options={[]}
            onChange={() => null}
            disabled={false}
        />
        <Select
            label="Model Variant"
            name="modelVariant"
            value={searchParams?.model as string}
            options={[]}
            onChange={() => null}
            disabled={false}
        />


    </>
};
