import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuGrid } from "@/components/MenuGrid";
import type { MenuResponse } from "@/types/menu";

export function Menu() {
  const { data, isLoading, error } = useQuery<MenuResponse>({
    queryKey: ["/api/menu"],
    refetchOnMount: true,
    staleTime: 0
  });

  const categories = data?.categories || [];
  const [activeCategory, setActiveCategory] = useState<string>();

  // Update active category when data loads
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].name);
    }
  }, [categories, activeCategory]);

  const onSelectCategory = (category: string) => {
    setActiveCategory(category);
    // Scroll to category section
    const element = document.getElementById(category);
    if (element) {
      const headerOffset = 160; // Account for fixed header height and padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  console.log("Menu data:", data); // Add logging for debugging

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
          activeCategory={activeCategory || ''}
          onSelectCategory={onSelectCategory}
        />
      </header>

      <main className="container mx-auto px-4">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.name}
            className="scroll-mt-48"
          >
            <h2 className="text-2xl md:text-3xl font-bold px-2 pt-8 uppercase tracking-wide text-white">{category.name}</h2>
            <MenuGrid items={category.items} />
          </section>
        ))}
      </main>
    </div>
  );
}