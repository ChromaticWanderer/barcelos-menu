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
    <div className={cn("flex items-center gap-6", className)}>
      {spiceLevels.map((level) => (
        <div key={level.id} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-xs tracking-tight shadow-lg",
              level.color
            )}>
              {level.id}
            </div>
            <img
              src={`/chili-${level.id.toLowerCase()}.svg`}
              alt=""
              className="w-6 h-6 -scale-x-100"
            />
          </div>
          <div className="text-[11px] text-white font-medium text-center whitespace-nowrap">
            {level.name}
          </div>
        </div>
      ))}
    </div>
  );
}
