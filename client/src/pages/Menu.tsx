import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuGrid } from "@/components/MenuGrid";
import type { MenuResponse } from "@/types/menu";

export function Menu() {
  const { data, isLoading, error } = useQuery<MenuResponse>({
    queryKey: ["/api/menu"],
  });

  const categories = data?.categories || [];
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">Error loading menu. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="flex h-24 md:h-28 items-center justify-center px-4 md:px-6">
          <img 
            src="/Logoupdate.png"
            alt="Barcelos"
            className="h-16 md:h-20"
          />
        </div>
        <CategoryNav
          categories={categories.map(cat => cat.name)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </header>

      <main className="container mx-auto px-4">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.name}
            className="scroll-mt-40"
          >
            <h2 className="text-2xl md:text-3xl font-bold px-2 pt-8 uppercase tracking-wide text-white">{category.name}</h2>
            <MenuGrid items={category.items} />
          </section>
        ))}
      </main>
    </div>
  );
}
