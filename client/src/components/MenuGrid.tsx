import type { MenuItem } from "@/types/menu";
import { MenuCard } from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-4">
      {items.map((item, index) => (
        <MenuCard key={`${item.category}-${item.itemName}-${index}`} item={item} />
      ))}
    </div>
  );
}
