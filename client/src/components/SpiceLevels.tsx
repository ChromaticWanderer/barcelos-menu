import { cn } from "@/lib/utils";

interface SpiceLevelOption {
  id: string;
  name: string;
  color: string;
}

const spiceLevels: SpiceLevelOption[] = [
  { id: "TL", name: "Tangy Lemon", color: "bg-yellow-300" },
  { id: "P", name: "Prego", color: "bg-green-600" },
  { id: "MP", name: "Mild Peri", color: "bg-yellow-400" },
  { id: "VP", name: "Veri Peri", color: "bg-orange-500" },
  { id: "SP", name: "Supa Peri", color: "bg-red-600" },
];

interface SpiceLevelsProps {
  className?: string;
}

export function SpiceLevels({ className }: SpiceLevelsProps) {
  return (
    <div className={cn("flex items-start justify-end space-x-6", className)}>
      {spiceLevels.map((level) => (
        <div key={level.id} className="flex flex-col items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg border-2 border-white/30",
            level.color
          )}>
            {level.id}
          </div>
          <div className="mt-1.5 flex flex-col items-center">
            {level.name === "Tangy Lemon" ? (
              <>
                <span className="text-[11px] leading-none text-white font-medium">Tangy</span>
                <span className="text-[11px] leading-none text-white font-medium mt-0.5">Lemon</span>
              </>
            ) : (
              <span className="text-[11px] leading-tight text-white font-medium whitespace-nowrap">{level.name}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
