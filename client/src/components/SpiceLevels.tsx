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
    <div className={cn("flex items-center gap-4", className)}>
      {spiceLevels.map((level) => (
        <div key={level.id} className="flex flex-col items-center gap-1.5">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg ring-2 ring-white/10",
            level.color
          )}>
            {level.id}
          </div>
          <div className="flex flex-col items-center">
            {level.name === "Tangy Lemon" ? (
              <>
                <div className="text-[11px] leading-tight text-white font-medium">Tangy</div>
                <div className="text-[11px] leading-tight text-white font-medium">Lemon</div>
              </>
            ) : (
              <div className="text-[11px] leading-tight text-white font-medium">{level.name}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
