"use client"
import { AwaitedPageProps } from "@/config/types";
import { useRouter } from "next/navigation"
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { TaxonomyFilters } from "../inventory/taxonomy-filters";

export const HomepageTaxonomyFilters = ({searchParams}: AwaitedPageProps) =>{
    
    const [, setState] = useQueryStates({
        make: parseAsString.withDefault(""),
        model: parseAsString.withDefault(""),
        modelVariant: parseAsString.withDefault(""),
        minYear: parseAsString.withDefault(""),
        maxYear: parseAsString.withDefault(""),
        minPrice: parseAsString.withDefault(""),
        maxPrice: parseAsString.withDefault(""),
    }, {shallow: false});

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) =>{
        const { name, value } = e.target;
        switch (name) {
            case "make":
                await setState({make: value, model:null, modelVariant: null});
                break;
            case "model":
                await setState({model: value, modelVariant: null});
                break;
                default:
                    await setState({[name]: value});
                    
        }
    };
    return (
        <>
        <TaxonomyFilters 
        handleChange={handleChange}
        searchParams={searchParams}
        />
        </>
    )}