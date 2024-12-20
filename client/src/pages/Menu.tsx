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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center px-6">
          <img 
            src="/Red Side Logo.png"
            alt="Barcelos"
            className="h-8"
          />
        </div>
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </header>

      <main>
        {categories.map((category) => (
          <section
            key={category}
            id={category}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl font-bold px-6 pt-8">{category}</h2>
            <MenuGrid items={menuItemsByCategory[category]} />
          </section>
        ))}
      </main>
    </div>
  );
}
