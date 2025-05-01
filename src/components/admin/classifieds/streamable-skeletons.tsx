import { ClassifiedAI } from "@/app/schemas/classified-ai.schema";
import { Skeleton } from "@/components/ui/skeleton";
import { imageSources } from "@/config/constants";
import { formatBodyType, formatColour, formatFuelType, formatNumber, formatOdometerUnit, formatTransmission, formatUlezCompliance } from "@/lib/utils";
import { Make } from "@prisma/client";
import { CarFrontIcon, CarIcon, CheckIcon, Fingerprint, FuelIcon, GaugeIcon, PowerIcon, UsersIcon, XIcon } from "lucide-react";
import Image from "next/image";

export type StreamableSkeletonProps = Partial<Omit<ClassifiedAI, "make">> & {
    make?: Make;
    done?: boolean;
};

export const StreamableSkeleton = (props: StreamableSkeletonProps) => {
    const {
        image,
        title,
        odoReading,
        fuelType,
        transmission,
        description,
        bodyType,
        seats,
        ulezCompliance,
        doors,
        colour,
        vrm,
        odoUnit,
        make,
        done,
    } = props;
    return (
        <div className="flex flex-col container mx-auto py-12">
            {/* Main container for the skeleton */}
            <div className="flex flex-col md:flex-row">
                {/* Image section */}
                <div className="md:w-1/2 relative">
                    {image ? (
                        <Image src={image} alt={title || "Vehicle Image"} width={600} height={400} className="rounded-lg aspect-3/2 object-cover" />
                    ) : (
                        <Skeleton className="aspect-3/2 w-full bg-gray-800" />
                    )}
                </div>
                {/* Details section */}
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                    {/* Header section with make and title */}
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        {/* Make logo */}
                        {make ? (
                            <Image src={make.image} alt={make.name} width={80} height={64} className="rounded-lg aspect-3/2 object-cover" />
                        ) : !done ? (
                            <Skeleton className="w-16 h-16 bg-gray-800 " />
                        ) : null}
                        {/* Title */}
                        <div className="m-auto" >
                            {title ? (
                                <h1 className="text-2xl font-bold">{title}</h1>
                            ) : (
                                <Skeleton className="h-8 w-64 md:w-30 md:p-1  mb-2 bg-gray-800" />
                            )}
                        </div>
                    </div>
                    {/* Vehicle attributes */}
                    <div className="my-4 flex flex-wrap items-center gap-2">
                        {/* Odometer reading */}
                        {odoReading && odoUnit ? (
                            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-md">
                                {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
                            </span>
                        ) : !done ? (
                            <Skeleton className="bg-gray-800 h-6 w-16 rounded-md" />
                        ) : null}
                        {/* Fuel type */}
                        {fuelType ? (
                            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-lg">
                                {formatFuelType(fuelType)}
                            </span>
                        ) : !done ? (
                            <Skeleton className="bg-gray-800 h-6 w-16 rounded-md" />
                        ) : null}
                        {/* Colour */}
                        {colour ? (
                            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-lg">
                                {formatColour(colour)}
                            </span>
                        ) : !done ? (
                            <Skeleton className="bg-gray-800 h-6 w-16 rounded-md" />
                        ) : null}
                        {/* Transmission */}
                        {transmission ? (
                            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-lg">
                                {formatTransmission(transmission)}
                            </span>
                        ) : !done ? (
                            <Skeleton className="bg-gray-800 h-6 w-16 rounded-md" />
                        ) : null}
                        {/* Description */}
                        {description ? (
                            <p className="text-gray-500 mb-4">{description}</p>
                        ) : (
                            <Skeleton className="h-20 w-full mb-4 bg-gray-800" />
                        )}
                        {/* Grid of additional attributes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-2 md:gap-2">
                            {/* ULEZ compliance */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-2 text-center w-15">
                                {ulezCompliance === "EXEMPT" ? (
                                    <CheckIcon className="w-6 h-6 mx-auto text-green-500" />
                                ) : (
                                    <XIcon className="w-6 h-6 mx-auto text-red-500" />
                                )}
                                {ulezCompliance ? (
                                    <p className="text-sm font-medium mt-2 truncate">
                                        {formatUlezCompliance(ulezCompliance)}
                                    </p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 mx-auto sm:w-1 md:w-9 mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Body type */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <CarIcon className="w-6 h-6 mx-auto" />
                                {bodyType ? (
                                    <p className="text-sm font-medium mt-2 truncate">
                                        {formatBodyType(bodyType)}
                                    </p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* VRM */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <Fingerprint className="w-6 h-6 mx-auto" />
                                {vrm ? (
                                    <p className="text-sm font-medium mt-2 truncate">{vrm}</p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Fuel type icon */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <FuelIcon className="w-6 h-6 mx-auto" />
                                {fuelType ? (
                                    <p className="text-sm font-medium mt-2 truncate">
                                        {formatFuelType(fuelType)}
                                    </p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Transmission icon */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <PowerIcon className="w-6 h-6 mx-auto" />
                                {transmission ? (
                                    <p className="text-sm font-medium mt-2 truncate">
                                        {formatTransmission(transmission)}
                                    </p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Odometer reading icon */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <GaugeIcon className="w-6 h-6 mx-auto" />
                                {odoReading && odoUnit ? (
                                    <p className="text-sm font-medium mt-2 truncate">
                                        {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
                                    </p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Seats icon */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <UsersIcon className="w-6 h-6 mx-auto" />
                                {seats ? (
                                    <p className="text-sm font-medium mt-2">{seats}</p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                            {/* Doors icon */}
                            <div className="bg-gray-800 rounded-lg shadow-xs p-4 text-center w-15">
                                <CarFrontIcon className="w-6 h-6 mx-auto" />
                                {doors ? (
                                    <p className="text-sm font-medium mt-2">{doors}</p>
                                ) : !done ? (
                                    <Skeleton className="h-4 w-16 sm:w-3 md:w-9 mx-auto mt-2" />
                                ) : (
                                    <p className="text-sm font-light truncate mt-2">UNKNOWN</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
