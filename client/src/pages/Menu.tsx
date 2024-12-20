import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { CategoryNav } from "@/components/CategoryNav";
import { MenuGrid } from "@/components/MenuGrid";
import type { MenuResponse } from "@/types/menu";

export function Menu() {
  const { data, isLoading, error } = useQuery<MenuResponse>({
    queryKey: ["/api/menu"],
    refetchOnMount: true,
    staleTime: 0,
    refetchInterval: 5000 // Add refresh interval to keep menu data updated
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
      const headerOffset = 200; // Account for fixed header height (logo + navigation) and padding
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
    <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" 
        style={{ 
          backgroundImage: `url('/pattern-overlay.png')`,
          backgroundSize: '400px'
        }} 
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-primary/20 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-24 md:h-28 items-center justify-center px-4 md:px-6 bg-gradient-to-b from-primary/10">
          <Logo className="h-16 md:h-20" />
        </div>
        <CategoryNav
          categories={categories.map(cat => cat.name)}
          activeCategory={activeCategory || ''}
          onSelectCategory={onSelectCategory}
        />
      </header>

      <main className="container mx-auto px-4 relative pt-[calc(6rem+4rem)] md:pt-[calc(7rem+4rem)]">
        {categories.map((category, index) => {
          // Alternate between brand colors for section backgrounds
          const bgColors = [
            'from-primary/5',
            'from-yellow-600/5',
            'from-emerald-600/5',
            'from-cyan-600/5',
            'from-orange-600/5'
          ];
          const bgColor = bgColors[index % bgColors.length];
          
          return (
            <motion.section
              key={category.id}
              id={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * 0.1 
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              className={`scroll-mt-64 rounded-xl mb-8 bg-gradient-to-b ${bgColor} to-transparent`}
            >
              <motion.div 
                className="px-4 py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <motion.span 
                    className="w-2 h-8 bg-primary mr-4 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  />
                  {category.name}
                </motion.h2>
                <MenuGrid items={category.items} />
              </motion.div>
            </motion.section>
          );
        })}
      </main>
    </div>
  );
}