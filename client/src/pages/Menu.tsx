import { useState, useEffect } from "react";
import { categories, menuItemsByCategory } from "@/data/menu";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuGrid } from "@/components/MenuGrid";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    const element = document.getElementById(activeCategory);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="flex h-20 items-center justify-center px-4 md:px-6">
          <img 
            src="Red Side Logo.png"
            alt="Barcelos"
            className="h-12 md:h-14"
          />
        </div>
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </header>

      <main className="container mx-auto px-4">
        {categories.map((category) => (
          <section
            key={category}
            id={category}
            className="scroll-mt-40"
          >
            <h2 className="text-2xl md:text-3xl font-bold px-2 pt-8 uppercase tracking-wide">{category}</h2>
            <MenuGrid items={menuItemsByCategory[category]} />
          </section>
        ))}
      </main>
    </div>
  );
}
