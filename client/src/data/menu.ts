import type { MenuItem } from "@/types/menu";

export const menuData: MenuItem[] = [
  {
    category: "Chicken From The Grill",
    itemName: "1/4 Chicken and one side",
    regularPrice: "R47.90",
    imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/grill-quarter-chicken-430x430-1.png"
  },
  // Note: All menu items from the CSV would be listed here, omitted for brevity
];

export const categories = Array.from(new Set(menuData.map(item => item.category))).filter(Boolean);

export const menuItemsByCategory = menuData.reduce((acc, item) => {
  if (!item.category) return acc;
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);
