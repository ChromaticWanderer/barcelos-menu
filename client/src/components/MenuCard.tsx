import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.itemName}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.itemName}</h3>
        <p className="text-primary text-xl font-bold">{item.regularPrice}</p>
      </CardContent>
    </Card>
  );
}
