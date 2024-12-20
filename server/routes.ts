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
      await db
        .update(menuItems)
        .set({
          price: "R88.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png",
        })
        .where(eq(menuItems.id, 151));

      await db
        .update(menuItems)
        .set({
          price: "R93.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png",
        })
        .where(eq(menuItems.id, 155));

      await db
        .update(menuItems)
        .set({
          price: "R90.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png",
        })
        .where(eq(menuItems.id, 152));

      await db
        .update(menuItems)
        .set({
          price: "R107.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png",
        })
        .where(eq(menuItems.id, 149));

      await db
        .update(menuItems)
        .set({
          price: "R107.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png",
        })
        .where(eq(menuItems.id, 153));

      await db
        .update(menuItems)
        .set({
          price: "R116.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png",
        })
        .where(eq(menuItems.id, 150));

      await db
        .update(menuItems)
        .set({
          price: "R119.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png",
        })
        .where(eq(menuItems.id, 156));

      // Items already inserted above, removing duplicate insert

      await db
        .update(menuItems)
        .set({ price: "R136.00" })
        .where(eq(menuItems.id, 136));

      await db
        .update(menuItems)
        .set({ price: "R236.90" })
        .where(eq(menuItems.id, 137));

      await db
        .update(menuItems)
        .set({ price: "R79.90" })
        .where(eq(menuItems.id, 138));

      await db
        .update(menuItems)
        .set({ price: "R95.90" })
        .where(eq(menuItems.id, 139));

      await db
        .update(menuItems)
        .set({ price: "R88.90" })
        .where(eq(menuItems.id, 140));

      await db
        .update(menuItems)
        .set({ price: "R107.90" })
        .where(eq(menuItems.id, 141));

      await db
        .update(menuItems)
        .set({ price: "R105.90" })
        .where(eq(menuItems.id, 142));

      await db
        .update(menuItems)
        .set({ price: "R90.90" })
        .where(eq(menuItems.id, 143));

      await db
        .update(menuItems)
        .set({ price: "R79.90" })
        .where(eq(menuItems.id, 144));

      await db
        .update(menuItems)
        .set({ price: "R95.90" })
        .where(eq(menuItems.id, 145));

      await db
        .update(menuItems)
        .set({ price: "R166.90" })
        .where(eq(menuItems.id, 146));

      await db
        .update(menuItems)
        .set({ price: "R215.90" })
        .where(eq(menuItems.id, 1));

      await db
        .update(menuItems)
        .set({ price: "R329.90" })
        .where(eq(menuItems.id, 147));

      await db
        .update(menuItems)
        .set({ price: "R431.90" })
        .where(eq(menuItems.id, 148));

      await db
        .update(menuItems)
        .set({ price: "R72.90" })
        .where(eq(menuItems.id, 154));

      await db
        .update(menuItems)
        .set({
          price: "R88.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png",
        })
        .where(eq(menuItems.id, 151));

      await db
        .update(menuItems)
        .set({
          price: "R93.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png",
        })
        .where(eq(menuItems.id, 155));

      await db
        .update(menuItems)
        .set({
          price: "R90.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png",
        })
        .where(eq(menuItems.id, 152));

      await db
        .update(menuItems)
        .set({
          price: "R107.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png",
        })
        .where(eq(menuItems.id, 149));

      await db
        .update(menuItems)
        .set({
          price: "R107.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png",
        })
        .where(eq(menuItems.id, 153));

      await db
        .update(menuItems)
        .set({
          price: "R116.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png",
        })
        .where(eq(menuItems.id, 150));

      await db
        .update(menuItems)
        .set({
          price: "R119.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png",
        })
        .where(eq(menuItems.id, 156));

      await db.insert(menuItems).values([
        {
          id: 163,
          name: "Chicken Livers and one side",
          price: "R61.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-livers-430x430-1.gif",
          categoryId: 33,
        },
        {
          id: 162,
          name: "Chicken Kebab in Roll and one side",
          price: "R46.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-kebab-in-roll-430x430-1.gif",
          categoryId: 33,
        },
        {
          id: 166,
          name: "6 Dippa Wings and one side",
          price: "R64.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/especially-6-dippa-wings-430x430-1.gif",
          categoryId: 33,
        },
        {
          id: 167,
          name: "Portuguese Galito Roll and one side",
          price: "R65.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2023/08/galito-roll.png",
          categoryId: 33,
        },
        {
          id: 165,
          name: "2 Kebabs and one side",
          price: "R64.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/especially-two-kebabs-430x430-1.png",
          categoryId: 33,
        },
        {
          id: 164,
          name: "Chicken Trinchado",
          price: "R68.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/especially-trinchado-430x430-2.png",
          categoryId: 33,
        },
        {
          id: 157,
          name: "Ayoba Meal",
          price: "R50.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/favs-bafana-meal-430x430-1.png",
          categoryId: 31,
        },
        {
          id: 158,
          name: "Super Ayoba Meal",
          price: "R79.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/favs-super-bafana-meal-430x430-1.png",
          categoryId: 31,
        },
        {
          id: 159,
          name: "Mega Ayoba Meal",
          price: "R119.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/favs-mega-bafana-meal-430x430-1.gif",
          categoryId: 31,
        },
        {
          id: 203,
          name: "Regular Garden Salad",
          price: "R32.90",
          imageUrl: "",
          categoryId: 34,
        },
        {
          id: 169,
          name: "Medium Garden Salad",
          price: "R43.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/salads-garden-salad-430x430-3.png",
          categoryId: 34,
        },
        {
          id: 204,
          name: "Large Garden Salad",
          price: "R51.90",
          imageUrl: "",
          categoryId: 34,
        },
        {
          id: 171,
          name: "Medium Mediterranean Salad",
          price: "R56.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
          categoryId: 34,
        },
        {
          id: 172,
          name: "Large Mediterranean Salad",
          price: "R69.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
          categoryId: 34,
        },
        {
          id: 173,
          name: "Regular Chicken Salad",
          price: "R73.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
          categoryId: 34,
        },
        {
          id: 174,
          name: "Large Chicken Salad",
          price: "R88.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
          categoryId: 34,
        },
        {
          id: 187,
          name: "Regular Fries",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 188,
          name: "Medium Fries",
          price: "R40.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 189,
          name: "Large Fries",
          price: "R47.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 181,
          name: "Regular Pap & Tomato Relish",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-pap-and-relish-430x430-1.gif",
          categoryId: 37,
        },
        {
          id: 205,
          name: "Medium Pap & Tomato Relish",
          price: "R40.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 206,
          name: "Large Pap & Tomato Relish",
          price: "R47.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 180,
          name: "Regular Potato Wedges",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-wedges-430x430-1.gif",
          categoryId: 37,
        },
        {
          id: 207,
          name: "Medium Potato Wedges",
          price: "R40.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 208,
          name: "Large Potato Wedges",
          price: "R47.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 182,
          name: "Regular Spicy Rice",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-spicy-rice-430x430-1.gif",
          categoryId: 37,
        },
        {
          id: 209,
          name: "Medium Spicy Rice",
          price: "R40.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 210,
          name: "Large Spicy Rice",
          price: "R47.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 183,
          name: "Regular 3 Bean Salad",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-3-bean-430x430-1.png",
          categoryId: 37,
        },
        {
          id: 211,
          name: "Medium 3 Bean Salad",
          price: "R40.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 212,
          name: "Large 3 Bean Salad",
          price: "R47.90",
          imageUrl: "",
          categoryId: 37,
        },
        {
          id: 184,
          name: "Regular Coleslaw",
          price: "R31.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 185,
          name: "Medium Coleslaw",
          price: "R40.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 186,
          name: "Large Coleslaw",
          price: "R47.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          categoryId: 37,
        },
        {
          id: 160,
          name: "Chicken Bowl",
          price: "R67.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-chicken-bowl-430x430-2.png",
          categoryId: 32,
        },
        {
          id: 161,
          name: "Beef Bowl",
          price: "R83.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-beef-430x430-1.png",
          categoryId: 32,
        },
        {
          id: 175,
          name: "Veggie Burger",
          price: "R100.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-burger-with-chips-430x430-1.png",
          categoryId: 35,
        },
        {
          id: 176,
          name: "Veggie Bowl",
          price: "R100.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/bowl-vegeterian-430x430-1.png",
          categoryId: 35,
        },
        {
          id: 177,
          name: "Veggie Schwarma",
          price: "R100.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-schwarma-with-chips-430x430-1.png",
          categoryId: 35,
        },
        {
          id: 178,
          name: "Kids Burger Meal",
          price: "R87.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2023/08/kids-burger-meal-2023-430x430-1.png",
          categoryId: 36,
        },
        {
          id: 179,
          name: "Kids Crumbed Chicken Strips & Chips",
          price: "R87.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/kiddies-crumbed-chicken-strips-430x430-1.png",
          categoryId: 36,
        },
        {
          id: 190,
          name: "Mini Breakfast",
          price: "R53.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-mini-430x430-1.png",
          categoryId: 38,
        },
        {
          id: 191,
          name: "Cheesy Egg in Pita",
          price: "R71.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-cheesy-egg-in-pita.png",
          categoryId: 38,
        },
        {
          id: 192,
          name: "Drifter Breakfast",
          price: "R91.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-drifter-430x430-1.png",
          categoryId: 38,
        },
        {
          id: 193,
          name: "Algarve Breakfast",
          price: "R107.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-algarve-430x430-1.png",
          categoryId: 38,
        },
        {
          id: 194,
          name: "Soft Drinks 300ml",
          price: "R28.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-440ml-soft-drinks-430x430-1.png",
          categoryId: 39,
        },
        {
          id: 198,
          name: "Valpre 500ml",
          price: "R26.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-valpre-430x430-1.png",
          categoryId: 39,
        },
        {
          id: 196,
          name: "Suntropic Juice 1L",
          price: "R38.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-suntropic-juice-430x430-1.jpg",
          categoryId: 39,
        },
        {
          id: 197,
          name: "Lipton 300ml",
          price: "R22.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2023/08/lipton-lemon-ice-tea.png",
          categoryId: 39,
        },
        {
          id: 200,
          name: "Splash Juice 250ml",
          price: "R10.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/barcelos-drinks-splash-juice-430x430-1.jpg",
          categoryId: 39,
        },
        {
          id: 201,
          name: "Tizers",
          price: "R35.90",
          imageUrl:
            "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-tizers-430x430-1.png",
          categoryId: 39,
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
      const result = categories.map((category) => ({
        id: category.id,
        name: category.name,
        items: items
          .filter((item) => item.categoryId === category.id)
          .map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            categoryId: item.categoryId,
          })),
      }));

      res.json({ categories: result });
    } catch (error) {
      console.error("Error fetching menu:", error);
      res.status(500).json({
        error: "Failed to fetch menu",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Import menu data from CSV
  app.get("/api/menu/import", async (_req, res) => {
    try {
      if (!fs.existsSync("barcelos_menu.csv")) {
        return res.status(404).json({ error: "Menu CSV file not found" });
      }
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
          records.map((record: any) => record.Category?.trim()).filter(Boolean),
        ),
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
        itemsCount: menuItemsToInsert.length,
      });
    } catch (error) {
      console.error("Error importing menu data:", error);
      res.status(500).json({
        error: "Failed to import menu data",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
