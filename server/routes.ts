import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq } from "drizzle-orm/expressions";

// Sample menu data structure for direct import
const sampleMenuData = [
  {
    category: "Chicken From The Grill",
    name: "1/4 Chicken and one side",
    price: "R82.90",
    imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/grill-quarter-chicken-430x430-1.png"
  },
  {
    category: "Combos",
    name: "Tasty Twins",
    price: "R79.90",
    imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/combos-tasty-twins-430x430-1.png"
  }
];

export function registerRoutes(app: Express): Server {
  // Get menu data with categories and items
  app.get("/api/menu", async (_req, res) => {
    try {
      // Fetch all categories
      const categories = await db.select().from(menuCategories);

      // For each category, fetch its menu items
      const categoriesWithItems = await Promise.all(
        categories.map(async (category) => {
          const items = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.categoryId, category.id));

          return {
            id: category.id,
            name: category.name,
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl,
              categoryId: item.categoryId
            }))
          };
        })
      );

      res.json({ categories: categoriesWithItems });
    } catch (error) {
      console.error('Error fetching menu:', error);
      res.status(500).json({ error: 'Failed to fetch menu data' });
    }
  });

  // Import menu data endpoint
  app.post("/api/menu/import", async (req, res) => {
    try {
      const menuData = Array.isArray(req.body.menuItems) ? req.body.menuItems : sampleMenuData;

      // Process the menu data
      const result = await db.transaction(async (tx) => {
        // Insert categories first
        const categories = [...new Set(menuData.map(item => item.category))];
        const categoryMap = new Map();

        for (const categoryName of categories) {
          const [category] = await tx
            .insert(menuCategories)
            .values({ name: categoryName })
            .onConflictDoNothing()
            .returning();

          if (category) {
            categoryMap.set(categoryName, category.id);
          } else {
            // If category already exists, get its ID
            const existing = await tx
              .select()
              .from(menuCategories)
              .where(eq(menuCategories.name, categoryName))
              .limit(1);
            if (existing[0]) {
              categoryMap.set(categoryName, existing[0].id);
            }
          }
        }

        // Insert menu items
        const items = menuData.map(record => ({
          name: record.name,
          price: record.price,
          imageUrl: record.imageUrl || "",
          categoryId: categoryMap.get(record.category)
        }));

        await tx.insert(menuItems).values(items).onConflictDoNothing();
        return { categories: categories.length, items: items.length };
      });

      res.json({
        success: true,
        message: "Menu data imported successfully",
        imported: result
      });

    } catch (error) {
      console.error('Error importing menu data:', error);
      res.status(500).json({
        error: "Failed to import menu data",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}