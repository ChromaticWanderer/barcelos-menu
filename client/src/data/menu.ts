import type { MenuItem } from "@/types/menu";

// Menu data is now fetched from the API endpoint
//  Fetch data from API endpoint here:  e.g.,  fetch('/api/menu').then(response => response.json()).then(data => { ...handle data...})
export const menuData: MenuItem[] = [];

// Categories will be populated after fetching menu data.
export const categories: string[] = [];

// menuItemsByCategory will be populated after fetching menu data.
export const menuItemsByCategory: Record<string, MenuItem[]> = {};

// Add error handling and loading states as needed