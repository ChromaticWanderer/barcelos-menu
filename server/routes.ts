import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems, type InsertMenuItem } from "@db/schema";
import { eq } from "drizzle-orm/expressions";
import multer from "multer";
import { parse } from "csv-parse";
import { Readable } from "stream";
import path from "path";
import { z } from "zod";

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
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// CSV row validation schema
const csvRowSchema = z.object({
  category: z.string().min(1, "Category name is required"),
  name: z.string().min(1, "Item name is required"),
  price: z.string().regex(/^\d+(\.\d{2})?$/, "Price must be in format: 00.00"),
  imageUrl: z.string().url("Image URL must be a valid URL").optional().default(""),
});

type CSVRow = z.infer<typeof csvRowSchema>;

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
      const validatedRecords: CSVRow[] = [];
      const errors: Array<{ row: number; errors: string[] }> = [];
      let rowNumber = 0;

      // Parse CSV
      const parser = parse({
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      // Process and validate CSV data
      parser.on('readable', function() {
        let record;
        while ((record = parser.read()) !== null) {
          rowNumber++;
          try {
            const validatedRow = csvRowSchema.parse(record);
            validatedRecords.push(validatedRow);
          } catch (e) {
            if (e instanceof z.ZodError) {
              errors.push({
                row: rowNumber,
                errors: e.errors.map(err => `${err.path.join('.')}: ${err.message}`)
              });
            }
          }
        }
      });

      await new Promise((resolve, reject) => {
        const stream = Readable.from(fileContent);
        stream.pipe(parser);
        parser.on('end', resolve);
        parser.on('error', (err) => {
          console.error('CSV parsing error:', err);
          reject(new Error('Invalid CSV format'));
        });
      });

      // If there are validation errors, return them
      if (errors.length > 0) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors
        });
      }

      // No records to import
      if (validatedRecords.length === 0) {
        return res.status(400).json({
          error: "No valid records found in CSV"
        });
      }

      // Insert data into database
      const result = await db.transaction(async (tx) => {
        // Insert categories first
        const categories = [...new Set(validatedRecords.map(r => r.category))];
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
            } else {
              throw new Error(`Failed to create or find category: ${categoryName}`);
            }
          }
        }

        // Insert menu items
        const items: InsertMenuItem[] = validatedRecords.map(record => ({
          name: record.name,
          price: record.price,
          imageUrl: record.imageUrl,
          categoryId: categoryMap.get(record.category)!
        }));

        const insertedItems = await tx
          .insert(menuItems)
          .values(items)
          .onConflictDoNothing()
          .returning();

        return {
          categories: categories.length,
          items: insertedItems.length
        };
      });

      res.json({
        success: true,
        message: "CSV imported successfully",
        imported: result
      });

    } catch (error) {
      console.error('Error importing CSV:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(500).json({
        error: "Failed to import CSV",
        details: errorMessage
      });
    }
  });

  return httpServer;
}
