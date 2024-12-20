import { cn } from "@/lib/utils";

interface PriceVariant {
  size: string;
  price: string;
}

interface PriceVariantsProps {
  variants: PriceVariant[];
  className?: string;
}

export function PriceVariants({ variants, className }: PriceVariantsProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {variants.map((variant) => (
        <div 
          key={variant.size} 
          className="flex justify-between text-sm"
        >
          <span className="text-gray-300">{variant.size}</span>
          <span className="font-bold text-primary">{variant.price}</span>
        </div>
      ))}
    </div>
  );
}
