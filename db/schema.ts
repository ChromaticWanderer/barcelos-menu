import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
});

// Schemas for validation
export const insertCategorySchema = createInsertSchema(menuCategories);
export const selectCategorySchema = createSelectSchema(menuCategories);
export const insertMenuItemSchema = createInsertSchema(menuItems);
export const selectMenuItemSchema = createSelectSchema(menuItems);

// Types for TypeScript
export type InsertCategory = typeof menuCategories.$inferInsert;
export type SelectCategory = typeof menuCategories.$inferSelect;
export type InsertMenuItem = typeof menuItems.$inferInsert;
export type SelectMenuItem = typeof menuItems.$inferSelect;
