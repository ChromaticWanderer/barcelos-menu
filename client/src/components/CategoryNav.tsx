import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryNav({ categories, activeCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap border-b border-gray-800">
      <div className="flex w-max space-x-2 md:space-x-4 p-3 md:p-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="lg"
            onClick={() => onSelectCategory(category)}
            className={cn(
              "text-sm md:text-base transition-colors hover:text-primary uppercase tracking-wide",
              activeCategory === category ? "font-black text-primary" : "text-gray-400"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="bg-gray-800" />
    </ScrollArea>
  );
}
