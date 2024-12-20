import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import fs from "fs";
import { parse } from "csv-parse/sync";

export function registerRoutes(app: Express): Server {
  // Menu routes
  app.get("/api/menu", async (_req, res) => {
    try {
      // First get all categories
      const categories = await db.select().from(menuCategories);
      
      // Then get all menu items
      const items = await db.select().from(menuItems);
      
      // Create the nested structure
      const result = categories.map(category => ({
        id: category.id,
        name: category.name,
        items: items.filter(item => item.categoryId === category.id).map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          categoryId: item.categoryId,
        }))
      }));

      res.json({ categories: result });
    } catch (error) {
      console.error("Error fetching menu:", error);
      res.status(500).json({ error: "Failed to fetch menu" });
    }
  });

  // Import menu data from CSV
  app.post("/api/menu/import", async (_req, res) => {
    try {
      // Read CSV file
      const csvData = fs.readFileSync("barcelos_menu.csv", "utf-8");
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true
      });

      // Clear existing data
      await db.delete(menuItems);
      await db.delete(menuCategories);

      // Get unique categories
      const uniqueCategories = Array.from(new Set(records.map((record: any) => record.Category).filter(Boolean)));
      
      // Insert categories and build category map
      const categoryMap = new Map();
      for (const categoryName of uniqueCategories) {
        const [category] = await db.insert(menuCategories)
          .values({ name: categoryName })
          .returning();
        categoryMap.set(categoryName, category.id);
      }

      // Insert menu items
      const menuItemsToInsert = records
        .filter((record: any) => record.Category && record["Item Name"])
        .map((record: any) => ({
          categoryId: categoryMap.get(record.Category),
          name: record["Item Name"],
          price: record["Regular Price"],
          imageUrl: record["Image URL"],
        }));

      if (menuItemsToInsert.length > 0) {
        await db.insert(menuItems).values(menuItemsToInsert);
      }

      res.json({ 
        message: "Menu data imported successfully",
        categoriesCount: uniqueCategories.length,
        itemsCount: menuItemsToInsert.length
      });
    } catch (error) {
      console.error("Error importing menu data:", error);
      res.status(500).json({ 
        error: "Failed to import menu data",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
