import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq } from "drizzle-orm/expressions";
import multer from "multer";
import { parse } from "csv-parse";
import { Readable } from "stream";
import path from "path";

// Configure multer for CSV file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.csv') {
      cb(new Error('Only CSV files are allowed'));
      return;
    }
    cb(null, true);
  }
});

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

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

  // CSV Import endpoint
  app.post("/api/menu/import", upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const fileContent = req.file.buffer.toString('utf-8');
      const records: any[] = [];

      // Parse CSV
      const parser = parse({
        columns: true,
        skip_empty_lines: true
      });

      // Process the CSV data
      parser.on('readable', function() {
        let record;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      });

      await new Promise((resolve, reject) => {
        const stream = Readable.from(fileContent);
        stream.pipe(parser);
        parser.on('end', resolve);
        parser.on('error', reject);
      });

      // Insert data into database
      const result = await db.transaction(async (tx) => {
        // Insert categories first
        const categories = [...new Set(records.map(r => r.category))];
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
        const items = records.map(record => ({
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
        message: "CSV imported successfully",
        imported: result
      });

    } catch (error) {
      console.error('Error importing CSV:', error);
      res.status(500).json({
        error: "Failed to import CSV",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return httpServer;
}
