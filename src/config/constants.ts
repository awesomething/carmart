import { routes } from "./routes";

export const imageSources = {
    classifiedPlaceholder: "https://eazydev-autoshop.s3.eu-north-1.amazonaws.com/uploads/AdobeStock_855683950.jpeg",
    
    carLineup: "https://eazydev-autoshop.s3.eu-north-1.amazonaws.com/uploads/AdobeStock_197763326.jpeg",

    featureSection: "https://eazydev-autoshop.s3.eu-north-1.amazonaws.com/uploads/AdobeStock_753683117.jpeg"
}

export const CLASSIFIEDS_PER_PAGE = 3;


export const navLinks = [
    { id: 1, href: routes.home, label: "Home" },
    { id: 2, href: routes.inventory, label: "Inventory" },
];