"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; 

const FAVOURITES_STORAGE_KEY = "favourites";

const getFavourites = (): number[] => {
  if (typeof window !== "undefined") {
    const favourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    return favourites ? JSON.parse(favourites) : [];
  }
  return [];
};

const toggleFavourite = (id: number) => {
  const favourites = getFavourites();
  const updatedFavourites = favourites.includes(id)
    ? favourites.filter((favId) => favId !== id) // Remove if already favorited
    : [...favourites, id]; // Add if not in list

  localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(updatedFavourites));
  return updatedFavourites;
};

const isFavourite = (id: number): boolean => {
  return getFavourites().includes(id);
};

interface FavouriteButtonProps {
  id: number;
}

export const FavouriteButton = ({ id }: FavouriteButtonProps) => {
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavourite(id));
  }, [id]);

  const handleFavourite = () => {
    toggleFavourite(id);
    setIsFav((prev) => !prev);
    setTimeout(() => router.refresh(), 250); // Refresh to update UI
    console.log("Favourites after toggle:", toggleFavourite(id));
  };

  return (
    <Button
      onClick={handleFavourite}
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-2.5 left-3.5 rounded-full z-10 group !h-6 !w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10",
        isFav ? "bg-white" : "!bg-muted/15"
      )}
    >
      <HeartIcon
        className={cn(
          "duration-200 transition-colors ease-in-out w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-6 xl:h-6 text-white",
          isFav
            ? "text-pink-500 fill-pink-500"
            : "group-hover:text-pink-500 group-hover:fill-pink-500"
        )}
      />
    </Button>
  );
};
