import { cn } from "@/lib/utils";

interface SpiceLevelOption {
  id: string;
  name: string;
  color: string;
}

const spiceLevels: SpiceLevelOption[] = [
  { id: "TL", name: "Tangy Lemon", color: "bg-[#FFE135]" },
  { id: "P", name: "Prego", color: "bg-[#008C45]" },
  { id: "MP", name: "Mild Peri", color: "bg-[#FFD700]" },
  { id: "VP", name: "Veri Peri", color: "bg-[#FF8C00]" },
  { id: "SP", name: "Supa Peri", color: "bg-[#FF0000]" },
];

interface SpiceLevelsProps {
  className?: string;
}

export function SpiceLevels({ className }: SpiceLevelsProps) {
  return (
    <div className={cn("flex items-start gap-8", className)}>
      {spiceLevels.map((level) => (
        <div key={level.id} className="flex flex-col items-center">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-sm border-2 border-white/20",
            level.color
          )}>
            {level.id}
          </div>
          <div className="mt-2 flex flex-col items-center">
            {level.name === "Tangy Lemon" ? (
              <>
                <span className="text-[11px] leading-tight text-white font-medium">Tangy</span>
                <span className="text-[11px] leading-tight text-white font-medium">Lemon</span>
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
