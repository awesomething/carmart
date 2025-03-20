"use client";

import { useEffect, useState } from "react";

const FAVOURITES_STORAGE_KEY = "favourites";

// Load the list of favorited item IDs from localStorage
export const useFavourites = () => {
  const [favourites, setFavourites] = useState<number[]>([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  // Toggle favorite state
  const toggleFavourite = (id: number) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.includes(id)
        ? prevFavourites.filter((favId) => favId !== id) // Remove if already favorited
        : [...prevFavourites, id]; // Add if not in list

      // Save updated favorites to localStorage
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(updatedFavourites));
      console.log("Updated favourites:", updatedFavourites)
      return updatedFavourites;
    });
  };

  return { favourites, toggleFavourite, isFavourite: (id: number) => favourites.includes(id) };
};
