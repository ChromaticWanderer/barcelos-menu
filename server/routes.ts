import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import fs from "fs";
import { parse } from "csv-parse/sync";

export function registerRoutes(app: Express): Server {
  // Update prices endpoint
  app.post("/api/menu/update-prices", async (_req, res) => {
    try {
      await db.update(menuItems)
        .set({ 
          price: "R88.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png"
        })
        .where(eq(menuItems.id, 151));

      await db.update(menuItems)
        .set({ 
          price: "R93.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png"
        })
        .where(eq(menuItems.id, 155));

      await db.update(menuItems)
        .set({ 
          price: "R90.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png"
        })
        .where(eq(menuItems.id, 152));

      await db.update(menuItems)
        .set({ 
          price: "R107.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png"
        })
        .where(eq(menuItems.id, 149));

      await db.update(menuItems)
        .set({ 
          price: "R107.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png"
        })
        .where(eq(menuItems.id, 153));

      await db.update(menuItems)
        .set({ 
          price: "R116.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png"
        })
        .where(eq(menuItems.id, 150));

      await db.update(menuItems)
        .set({ 
          price: "R119.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png"
        })
        .where(eq(menuItems.id, 156));

      await db.insert(menuItems).values([
        {
          id: 163,
          name: "Chicken Livers and one side",
          price: "R61.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-livers-430x430-1.gif",
          categoryId: 33
        },
        {
          id: 162,
          name: "Chicken Kebab in Roll and one side",
          price: "R46.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-kebab-in-roll-430x430-1.gif",
          categoryId: 33
        },
        {
          id: 166,
          name: "6 Dippa Wings and one side",
          price: "R64.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-6-dippa-wings-430x430-1.gif",
          categoryId: 33
        }
      ]);
      
      await db.update(menuItems)
        .set({ price: "R136.00" })
        .where(eq(menuItems.id, 136));
      
      await db.update(menuItems)
        .set({ price: "R236.90" })
        .where(eq(menuItems.id, 137));
      
      await db.update(menuItems)
        .set({ price: "R79.90" })
        .where(eq(menuItems.id, 138));
      
      await db.update(menuItems)
        .set({ price: "R95.90" })
        .where(eq(menuItems.id, 139));
      
      await db.update(menuItems)
        .set({ price: "R88.90" })
        .where(eq(menuItems.id, 140));
        
      await db.update(menuItems)
        .set({ price: "R107.90" })
        .where(eq(menuItems.id, 141));
        
      await db.update(menuItems)
        .set({ price: "R105.90" })
        .where(eq(menuItems.id, 142));
        
      await db.update(menuItems)
        .set({ price: "R90.90" })
        .where(eq(menuItems.id, 143));
        
      await db.update(menuItems)
        .set({ price: "R79.90" })
        .where(eq(menuItems.id, 144));
        
      await db.update(menuItems)
        .set({ price: "R95.90" })
        .where(eq(menuItems.id, 145));
        
      await db.update(menuItems)
        .set({ price: "R166.90" })
        .where(eq(menuItems.id, 146));
        
      await db.update(menuItems)
        .set({ price: "R215.90" })
        .where(eq(menuItems.id, 1));
        
      await db.update(menuItems)
        .set({ price: "R329.90" })
        .where(eq(menuItems.id, 147));
        
      await db.update(menuItems)
        .set({ price: "R431.90" })
        .where(eq(menuItems.id, 148));
        
      await db.update(menuItems)
        .set({ price: "R72.90" })
        .where(eq(menuItems.id, 154));
        
      await db.update(menuItems)
        .set({ 
          price: "R88.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png"
        })
        .where(eq(menuItems.id, 151));
        
      await db.update(menuItems)
        .set({ 
          price: "R93.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png"
        })
        .where(eq(menuItems.id, 155));
        
      await db.update(menuItems)
        .set({ 
          price: "R90.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png"
        })
        .where(eq(menuItems.id, 152));
        
      await db.update(menuItems)
        .set({ 
          price: "R107.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png"
        })
        .where(eq(menuItems.id, 149));
        
      await db.update(menuItems)
        .set({ 
          price: "R107.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png"
        })
        .where(eq(menuItems.id, 153));
        
      await db.update(menuItems)
        .set({ 
          price: "R116.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png"
        })
        .where(eq(menuItems.id, 150));
        
      await db.update(menuItems)
        .set({ 
          price: "R119.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png"
        })
        .where(eq(menuItems.id, 156));
        
      await db.insert(menuItems).values([
        {
          id: 163,
          name: "Chicken Livers and one side",
          price: "R61.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-livers-430x430-1.gif",
          categoryId: 33
        },
        {
          id: 162,
          name: "Chicken Kebab in Roll and one side",
          price: "R46.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-kebab-in-roll-430x430-1.gif",
          categoryId: 33
        },
        {
          id: 166,
          name: "6 Dippa Wings and one side",
          price: "R64.90",
          imageUrl: "https://barcelos.co.za/wp-content/uploads/2021/07/especially-6-dippa-wings-430x430-1.gif",
          categoryId: 33
        }
      ]);

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating prices:", error);
      res.status(500).json({ error: "Failed to update prices" });
    }
  });

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
      res.status(500).json({ 
        error: "Failed to fetch menu",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Import menu data from CSV
  app.get("/api/menu/import", async (_req, res) => {
    try {
      // Read CSV file
      const csvData = fs.readFileSync("barcelos_menu.csv", "utf-8");
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      console.log("Parsed CSV records:", records.length);

      // Clear existing data
      await db.delete(menuItems);
      await db.delete(menuCategories);

      // Get unique categories and clean their names
      const uniqueCategories = Array.from(
        new Set(
          records
            .map((record: any) => record.Category?.trim())
            .filter(Boolean)
        )
      ).sort();
      
      console.log("Unique categories:", uniqueCategories);
      
      // Insert categories and build category map
      const categoryMap = new Map();
      for (const categoryName of uniqueCategories) {
        const [category] = await db
          .insert(menuCategories)
          .values({ name: categoryName })
          .returning();
        categoryMap.set(categoryName, category.id);
      }

      // Insert menu items
      const menuItemsToInsert = records
        .filter((record: any) => {
          const hasCategory = Boolean(record.Category?.trim());
          const hasName = Boolean(record["Item Name"]?.trim());
          if (!hasCategory || !hasName) {
            console.log("Skipping invalid record:", record);
          }
          return hasCategory && hasName;
        })
        .map((record: any) => {
          const category = record.Category.trim();
          const categoryId = categoryMap.get(category);
          if (!categoryId) {
            console.log("Warning: No category ID for", category);
          }
          return {
            categoryId,
            name: record["Item Name"].trim(),
            price: record["Regular Price"]?.trim() || "N/A",
            imageUrl: record["Image URL"]?.trim() || "/default-dish.png",
          };
        });

      console.log("Menu items to insert:", menuItemsToInsert.length);

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