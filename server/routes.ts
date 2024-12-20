import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import { parse } from "csv-parse/sync";

export function registerRoutes(app: Express): Server {
  // Menu routes
  app.get("/api/menu", async (_req, res) => {
    try {
      const categories = await db.query.menuCategories.findMany({
        with: {
          items: true,
        },
      });
      res.json({ categories });
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

      // Get unique categories
      const uniqueCategories = Array.from(new Set(records.map((record: any) => record.Category)));
      
      // Insert categories
      for (const categoryName of uniqueCategories) {
        if (!categoryName) continue;
        try {
          await db.insert(menuCategories).values([{
            name: categoryName
          }]).onConflictDoNothing();
        } catch (error) {
          console.error(`Error inserting category ${categoryName}:`, error);
        }
      }

      // Get all categories with their IDs
      const categoryMap = new Map();
      const dbCategories = await db.select().from(menuCategories);
      dbCategories.forEach(cat => categoryMap.set(cat.name, cat.id));

      // Insert menu items
      for (const record of records) {
        if (!record.Category) continue;
        const categoryId = categoryMap.get(record.Category);
        if (!categoryId) continue;

        await db.insert(menuItems).values({
          categoryId,
          name: record["Item Name"],
          price: record["Regular Price"],
          imageUrl: record["Image URL"],
        }).onConflictDoNothing();
      }

      res.json({ message: "Menu data imported successfully" });
    } catch (error) {
      console.error("Error importing menu data:", error);
      res.status(500).json({ error: "Failed to import menu data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
