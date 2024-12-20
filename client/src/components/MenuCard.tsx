import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-black/40 border-primary/20 group">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden bg-black/60 relative">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/default-dish.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-base md:text-lg uppercase tracking-wide text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">{item.name}</h3>
        <p className="text-primary text-sm md:text-base font-bold">
          {item.price !== "N/A" ? (item.price.startsWith('R') ? item.price : `R${item.price}`) : "Price on request"}
        </p>
      </CardContent>
    </Card>
  );
}
