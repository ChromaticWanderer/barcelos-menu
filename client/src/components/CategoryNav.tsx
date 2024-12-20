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
    <ScrollArea className="w-full whitespace-nowrap border-b">
      <div className="flex w-max space-x-4 p-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="lg"
            onClick={() => onSelectCategory(category)}
            className={cn(
              "text-base transition-colors hover:text-primary",
              activeCategory === category ? "font-bold text-primary" : "text-muted-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
