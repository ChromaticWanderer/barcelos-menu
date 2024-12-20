import type { MenuItem } from "@/types/menu";
import { MenuCard } from "./MenuCard";
import { motion } from "framer-motion";

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 py-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((menuItem, index) => (
        <motion.div
          key={`${menuItem.categoryId}-${menuItem.name}-${index}`}
          variants={item}
        >
          <MenuCard item={menuItem} />
        </motion.div>
      ))}
    </motion.div>
  );
}
