import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-gray-900 border-gray-800">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.itemName}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-bold text-base md:text-lg mb-2 uppercase tracking-wide text-gray-100">{item.itemName}</h3>
        <p className="text-primary text-xl md:text-2xl font-black">{item.regularPrice}</p>
      </CardContent>
    </Card>
  );
}
