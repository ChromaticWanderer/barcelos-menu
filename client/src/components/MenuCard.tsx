import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-900 border-gray-800">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden bg-gray-800">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/default-dish.png";
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-base md:text-lg mb-1 uppercase tracking-wide text-gray-100">{item.name}</h3>
        <p className="text-gray-200 text-sm md:text-base font-bold">
          {item.price !== "N/A" ? `R${item.price}` : "Price on request"}
        </p>
      </CardContent>
    </Card>
  );
}
