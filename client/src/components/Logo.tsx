import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  fallbackSrc?: string;
}

export function Logo({ 
  className,
  fallbackSrc = "/Red Side Logo.png" 
}: LogoProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn(
      "relative flex items-center justify-center",
      isLoading && "animate-pulse bg-gray-800 rounded-lg",
      className
    )}>
      <img 
        src={error ? fallbackSrc : "/Logoupdate.png"}
        alt="Barcelos"
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          // Responsive sizing classes
          "h-12 w-auto sm:h-16 md:h-20 lg:h-24",
          className
        )}
        onError={(e) => {
          console.error("Logo failed to load, using fallback");
          setError(true);
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg" />
      )}
    </div>
  );
}
