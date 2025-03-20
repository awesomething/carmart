const SOURCE_ID_KEY = "sourceId";

// Function to set the sourceId in localStorage if it doesn't exist
export const setSourceId = (): string => {
  if (typeof window !== "undefined") {
    let sourceId = localStorage.getItem(SOURCE_ID_KEY);

    if (!sourceId) {
      sourceId = crypto.randomUUID(); // Generate a unique ID
      localStorage.setItem(SOURCE_ID_KEY, sourceId);
      console.log("Set sourceId in localStorage:", sourceId);
    } else {
      console.log("Retrieved sourceId from localStorage:", sourceId);
    }

    return sourceId;
  }
  return "";
};

// Function to retrieve the sourceId from localStorage
export const getSourceId = (): string | null => {
  if (typeof window !== "undefined") {
    const sourceId = localStorage.getItem(SOURCE_ID_KEY);
    console.log("Retrieved sourceId from localStorage:", sourceId);
    return sourceId;
  }
  return null;
};
