import type { MenuItem } from "@/types/menu";
import { MenuCard } from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {items.map((item, index) => (
        <MenuCard key={`${item.category}-${item.itemName}-${index}`} item={item} />
      ))}
    </div>
  );
}
