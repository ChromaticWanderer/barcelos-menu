import { cn } from "@/lib/utils";

interface SpiceLevelOption {
  id: string;
  name: string;
  color: string;
}

const spiceLevels: SpiceLevelOption[] = [
  { id: "TL", name: "Tangy Lemon", color: "bg-yellow-400" },
  { id: "P", name: "Prego", color: "bg-green-600" },
  { id: "MP", name: "Mild Peri", color: "bg-yellow-500" },
  { id: "VP", name: "Veri Peri", color: "bg-orange-500" },
  { id: "SP", name: "Supa Peri", color: "bg-red-600" },
];

interface SpiceLevelsProps {
  className?: string;
}

export function SpiceLevels({ className }: SpiceLevelsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {spiceLevels.map((level) => (
        <div key={level.id} className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm",
              level.color
            )}>
              {level.id}
            </div>
          </div>
          <div className="text-[10px] text-white font-medium mt-1 text-center">
            {level.name}
          </div>
        </div>
      ))}
    </div>
  );
}
