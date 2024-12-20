import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { menuCategories, menuItems } from "@db/schema";
import { eq } from "drizzle-orm";
import express from "express";

// Define menu data outside the route handler
const menuData = [
  {
    id: 135,
    categoryId: 27,
    name: "1/4 Chicken and one side",
    price: "R82.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/grill-quarter-chicken-430x430-1.png",
  },
  {
    id: 136,
    categoryId: 27,
    name: "1/2 Chicken and one side",
    price: "R136.00",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/grill-half-chicken-430x430-1.png",
  },
  {
    id: 137,
    categoryId: 27,
    name: "Whole Chicken and one side",
    price: "R236.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/grill-full-chicken-430x430-1.png",
  },
  {
    id: 138,
    categoryId: 28,
    name: "Tasty Twins",
    price: "R79.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-tasty-twins-430x430-1.png",
  },
  {
    id: 139,
    categoryId: 28,
    name: "Chicken Meal",
    price: "R95.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-meal-430x430-2.png",
  },
  {
    id: 140,
    categoryId: 28,
    name: "Chicken Burger Combo",
    price: "R88.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-burger-430x430-1.png",
  },
  {
    id: 141,
    categoryId: 28,
    name: "Chicken Schwarma Combo",
    price: "R107.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-schwarma-430x430-1.png",
  },
  {
    id: 142,
    categoryId: 28,
    name: "Kebab Meal",
    price: "R105.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-kebab-meal-430x430-1.png",
  },
  {
    id: 143,
    categoryId: 28,
    name: "Portuguese Galito Roll",
    price: "R90.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-galito-roll-430x430-1.png",
  },
  {
    id: 144,
    categoryId: 28,
    name: "Super Ayoba Combo",
    price: "R79.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/local-favs-super-bafana-430x430-1.png",
  },
  {
    id: 145,
    categoryId: 28,
    name: "Chicken Cheese Burger",
    price: "R95.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/cheese-burger.png",
  },
  {
    id: 146,
    categoryId: 29,
    name: "Half Pack",
    price: "R166.90",
    imageUrl: "https://barcelos.co.za/wp-content/uploads/2023/08/half-pack.png",
  },
  {
    id: 202,
    categoryId: 29,
    name: "Thumbs Up Feast",
    price: "R215.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/06/barcelos-thumbs-up-feast-430x430-1.jpg",
  },
  {
    id: 147,
    categoryId: 29,
    name: "Family Pack",
    price: "R329.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/family-family-pack-430x430-2.png",
  },
  {
    id: 148,
    categoryId: 29,
    name: "Super Family Pack",
    price: "R431.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/super-family-pack.png",
  },
  {
    id: 154,
    categoryId: 30,
    name: "Smash Chicken Burger and one side",
    price: "R72.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-budget-burger-430x430-2.png",
  },
  {
    id: 151,
    categoryId: 30,
    name: "Chicken Burger and one side",
    price: "R88.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png",
  },
  {
    id: 155,
    categoryId: 30,
    name: "Beef Burger and one side",
    price: "R93.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png",
  },
  {
    id: 152,
    categoryId: 30,
    name: "Chicken Prego and one side",
    price: "R90.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png",
  },
  {
    id: 149,
    categoryId: 30,
    name: "Beef Prego and one side",
    price: "R107.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png",
  },
  {
    id: 153,
    categoryId: 30,
    name: "Chicken Schwarma and one side",
    price: "R107.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png",
  },
  {
    id: 150,
    categoryId: 30,
    name: "Beef Schwarma and one side",
    price: "R116.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png",
  },
  {
    id: 156,
    categoryId: 30,
    name: "Double Delicious and one side",
    price: "R119.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png",
  },
  {
    id: 163,
    categoryId: 33,
    name: "Chicken Livers and one side",
    price: "R61.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-livers-430x430-1.gif",
  },
  {
    id: 162,
    categoryId: 33,
    name: "Chicken Kebab in Roll and one side",
    price: "R46.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-kebab-in-roll-430x430-1.gif",
  },
  {
    id: 166,
    categoryId: 33,
    name: "6 Dippa Wings and one side",
    price: "R64.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/especially-6-dippa-wings-430x430-1.gif",
  },
  {
    id: 167,
    categoryId: 33,
    name: "Portuguese Galito Roll and one side",
    price: "R65.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/galito-roll.png",
  },
  {
    id: 165,
    categoryId: 33,
    name: "2 Kebabs and one side",
    price: "R64.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/especially-two-kebabs-430x430-1.png",
  },
  {
    id: 164,
    categoryId: 33,
    name: "Chicken Trinchado",
    price: "R68.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/especially-trinchado-430x430-2.png",
  },
  {
    id: 157,
    categoryId: 31,
    name: "Ayoba Meal",
    price: "R50.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/favs-bafana-meal-430x430-1.png",
  },
  {
    id: 158,
    categoryId: 31,
    name: "Super Ayoba Meal",
    price: "R79.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/favs-super-bafana-meal-430x430-1.png",
  },
  {
    id: 159,
    categoryId: 31,
    name: "Mega Ayoba Meal",
    price: "R119.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/favs-mega-bafana-meal-430x430-1.gif",
  },
  {
    id: 203,
    categoryId: 34,
    name: "Regular Garden Salad",
    price: "R32.90",
    imageUrl: "",
  },
  {
    id: 169,
    categoryId: 34,
    name: "Medium Garden Salad",
    price: "R43.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/salads-garden-salad-430x430-3.png",
  },
  {
    id: 204,
    categoryId: 34,
    name: "Large Garden Salad",
    price: "R51.90",
    imageUrl: "",
  },
  {
    id: 171,
    categoryId: 34,
    name: "Medium Mediterranean Salad",
    price: "R56.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
  },
  {
    id: 172,
    categoryId: 34,
    name: "Large Mediterranean Salad",
    price: "R69.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
  },
  {
    id: 173,
    categoryId: 34,
    name: "Regular Chicken Salad",
    price: "R73.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
  },
  {
    id: 174,
    categoryId: 34,
    name: "Large Chicken Salad",
    price: "R88.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
  },
  {
    id: 187,
    categoryId: 37,
    name: "Regular Fries",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
  },
  {
    id: 188,
    categoryId: 37,
    name: "Medium Fries",
    price: "R40.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
  },
  {
    id: 189,
    categoryId: 37,
    name: "Large Fries",
    price: "R47.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
  },
  {
    id: 181,
    categoryId: 37,
    name: "Regular Pap & Tomato Relish",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-pap-and-relish-430x430-1.gif",
  },
  {
    id: 205,
    categoryId: 37,
    name: "Medium Pap & Tomato Relish",
    price: "R40.90",
    imageUrl: "",
  },
  {
    id: 206,
    categoryId: 37,
    name: "Large Pap & Tomato Relish",
    price: "R47.90",
    imageUrl: "",
  },
  {
    id: 180,
    categoryId: 37,
    name: "Regular Potato Wedges",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-wedges-430x430-1.gif",
  },
  {
    id: 207,
    categoryId: 37,
    name: "Medium Potato Wedges",
    price: "R40.90",
    imageUrl: "",
  },
  {
    id: 208,
    categoryId: 37,
    name: "Large Potato Wedges",
    price: "R47.90",
    imageUrl: "",
  },
  {
    id: 182,
    categoryId: 37,
    name: "Regular Spicy Rice",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-spicy-rice-430x430-1.gif",
  },
  {
    id: 209,
    categoryId: 37,
    name: "Medium Spicy Rice",
    price: "R40.90",
    imageUrl: "",
  },
  {
    id: 210,
    categoryId: 37,
    name: "Large Spicy Rice",
    price: "R47.90",
    imageUrl: "",
  },
  {
    id: 183,
    categoryId: 37,
    name: "Regular 3 Bean Salad",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-3-bean-430x430-1.png",
  },
  {
    id: 211,
    categoryId: 37,
    name: "Medium 3 Bean Salad",
    price: "R40.90",
    imageUrl: "",
  },
  {
    id: 212,
    categoryId: 37,
    name: "Large 3 Bean Salad",
    price: "R47.90",
    imageUrl: "",
  },
  {
    id: 184,
    categoryId: 37,
    name: "Regular Coleslaw",
    price: "R31.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
  },
  {
    id: 185,
    categoryId: 37,
    name: "Medium Coleslaw",
    price: "R40.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
  },
  {
    id: 186,
    categoryId: 37,
    name: "Large Coleslaw",
    price: "R47.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
  },
  {
    id: 160,
    categoryId: 32,
    name: "Chicken Bowl",
    price: "R67.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-chicken-bowl-430x430-2.png",
  },
  {
    id: 161,
    categoryId: 32,
    name: "Beef Bowl",
    price: "R83.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-beef-430x430-1.png",
  },
  {
    id: 175,
    categoryId: 35,
    name: "Veggie Burger",
    price: "R100.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-burger-with-chips-430x430-1.png",
  },
  {
    id: 176,
    categoryId: 35,
    name: "Veggie Bowl",
    price: "R100.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/bowl-vegeterian-430x430-1.png",
  },
  {
    id: 177,
    categoryId: 35,
    name: "Veggie Schwarma",
    price: "R100.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-schwarma-with-chips-430x430-1.png",
  },
  {
    id: 178,
    categoryId: 36,
    name: "Kids Burger Meal",
    price: "R87.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/kids-burger-meal-2023-430x430-1.png",
  },
  {
    id: 179,
    categoryId: 36,
    name: "Kids Crumbed Chicken Strips & Chips",
    price: "R87.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/kiddies-crumbed-chicken-strips-430x430-1.png",
  },
  {
    id: 190,
    categoryId: 38,
    name: "Mini Breakfast",
    price: "R53.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-mini-430x430-1.png",
  },
  {
    id: 191,
    categoryId: 38,
    name: "Cheesy Egg in Pita",
    price: "R71.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-cheesy-egg-in-pita.png",
  },
  {
    id: 192,
    categoryId: 38,
    name: "Drifter Breakfast",
    price: "R91.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-drifter-430x430-1.png",
  },
  {
    id: 193,
    categoryId: 38,
    name: "Algarve Breakfast",
    price: "R107.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-algarve-430x430-1.png",
  },
  {
    id: 194,
    categoryId: 39,
    name: "Soft Drinks 300ml",
    price: "R28.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-440ml-soft-drinks-430x430-1.png",
  },
  {
    id: 198,
    categoryId: 39,
    name: "Valpre 500ml",
    price: "R26.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-valpre-430x430-1.png",
  },
  {
    id: 196,
    categoryId: 39,
    name: "Suntropic Juice 1L",
    price: "R38.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-suntropic-juice-430x430-1.jpg",
  },
  {
    id: 197,
    categoryId: 39,
    name: "Lipton 300ml",
    price: "R22.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2023/08/lipton-lemon-ice-tea.png",
  },
  {
    id: 200,
    categoryId: 39,
    name: "Splash Juice 250ml",
    price: "R10.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/barcelos-drinks-splash-juice-430x430-1.jpg",
  },
  {
    id: 201,
    categoryId: 39,
    name: "Tizers",
    price: "R35.90",
    imageUrl:
      "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-tizers-430x430-1.png",
  },
];
const app = express(); // Declare 'app' as an express application instance
const httpServer = createServer(app);

export function registerRoutes(app: Express): Server {
  // Get menu data with categories and items
  app.get("/api/menu", async (_req, res) => {
    try {
      // Fetch all categories
      const categories = await db.select().from(menuCategories).orderBy(menuCategories.id);
      
      // For each category, fetch its menu items
      const categoriesWithItems = await Promise.all(
        categories.map(async (category) => {
          const items = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.categoryId, category.id))
            .orderBy(menuItems.id);
          
          return {
            id: category.id,
            name: category.name,
            items: items.map(item => ({
              id: item.id,
              categoryId: item.categoryId,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrl
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

  // Update prices endpoint with complete dataset
  app.post("/api/menu/update-prices", async (_req, res) => {
    try {
      await db.transaction(async (tx) => {
        const menuData = [
          {
            id: 135,
            categoryId: 27,
            name: "1/4 Chicken and one side",
            price: "R82.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/grill-quarter-chicken-430x430-1.png",
          },
          {
            id: 136,
            categoryId: 27,
            name: "1/2 Chicken and one side",
            price: "R136.00",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/grill-half-chicken-430x430-1.png",
          },
          {
            id: 137,
            categoryId: 27,
            name: "Whole Chicken and one side",
            price: "R236.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/grill-full-chicken-430x430-1.png",
          },
          {
            id: 138,
            categoryId: 28,
            name: "Tasty Twins",
            price: "R79.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-tasty-twins-430x430-1.png",
          },
          {
            id: 139,
            categoryId: 28,
            name: "Chicken Meal",
            price: "R95.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-meal-430x430-2.png",
          },
          {
            id: 140,
            categoryId: 28,
            name: "Chicken Burger Combo",
            price: "R88.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-burger-430x430-1.png",
          },
          {
            id: 141,
            categoryId: 28,
            name: "Chicken Schwarma Combo",
            price: "R107.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-chicken-schwarma-430x430-1.png",
          },
          {
            id: 142,
            categoryId: 28,
            name: "Kebab Meal",
            price: "R105.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-kebab-meal-430x430-1.png",
          },
          {
            id: 143,
            categoryId: 28,
            name: "Portuguese Galito Roll",
            price: "R90.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-galito-roll-430x430-1.png",
          },
          {
            id: 144,
            categoryId: 28,
            name: "Super Ayoba Combo",
            price: "R79.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/local-favs-super-bafana-430x430-1.png",
          },
          {
            id: 145,
            categoryId: 28,
            name: "Chicken Cheese Burger",
            price: "R95.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/cheese-burger.png",
          },
          {
            id: 146,
            categoryId: 29,
            name: "Half Pack",
            price: "R166.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/half-pack.png",
          },
          {
            id: 202,
            categoryId: 29,
            name: "Thumbs Up Feast",
            price: "R215.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/06/barcelos-thumbs-up-feast-430x430-1.jpg",
          },
          {
            id: 147,
            categoryId: 29,
            name: "Family Pack",
            price: "R329.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/family-family-pack-430x430-2.png",
          },
          {
            id: 148,
            categoryId: 29,
            name: "Super Family Pack",
            price: "R431.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/super-family-pack.png",
          },
          {
            id: 154,
            categoryId: 30,
            name: "Smash Chicken Burger and one side",
            price: "R72.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-budget-burger-430x430-2.png",
          },
          {
            id: 151,
            categoryId: 30,
            name: "Chicken Burger and one side",
            price: "R88.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/chicken-burger.png",
          },
          {
            id: 155,
            categoryId: 30,
            name: "Beef Burger and one side",
            price: "R93.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-burger-430x430-2.png",
          },
          {
            id: 152,
            categoryId: 30,
            name: "Chicken Prego and one side",
            price: "R90.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-prego-roll-chicken-430x430-1.png",
          },
          {
            id: 149,
            categoryId: 30,
            name: "Beef Prego and one side",
            price: "R107.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-prego-430x430-2.png",
          },
          {
            id: 153,
            categoryId: 30,
            name: "Chicken Schwarma and one side",
            price: "R107.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-chicken-schwarma-430x430-1.png",
          },
          {
            id: 150,
            categoryId: 30,
            name: "Beef Schwarma and one side",
            price: "R116.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bgs-beef-schwarma-430x430-2.png",
          },
          {
            id: 156,
            categoryId: 30,
            name: "Double Delicious and one side",
            price: "R119.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/combos-double-delicious-430x430-1.png",
          },
          {
            id: 163,
            categoryId: 33,
            name: "Chicken Livers and one side",
            price: "R61.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-livers-430x430-1.gif",
          },
          {
            id: 162,
            categoryId: 33,
            name: "Chicken Kebab in Roll and one side",
            price: "R46.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/especially-chicken-kebab-in-roll-430x430-1.gif",
          },
          {
            id: 166,
            categoryId: 33,
            name: "6 Dippa Wings and one side",
            price: "R64.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/especially-6-dippa-wings-430x430-1.gif",
          },
          {
            id: 167,
            categoryId: 33,
            name: "Portuguese Galito Roll and one side",
            price: "R65.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/galito-roll.png",
          },
          {
            id: 165,
            categoryId: 33,
            name: "2 Kebabs and one side",
            price: "R64.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/especially-two-kebabs-430x430-1.png",
          },
          {
            id: 164,
            categoryId: 33,
            name: "Chicken Trinchado",
            price: "R68.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/especially-trinchado-430x430-2.png",
          },
          {
            id: 157,
            categoryId: 31,
            name: "Ayoba Meal",
            price: "R50.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/favs-bafana-meal-430x430-1.png",
          },
          {
            id: 158,
            categoryId: 31,
            name: "Super Ayoba Meal",
            price: "R79.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/favs-super-bafana-meal-430x430-1.png",
          },
          {
            id: 159,
            categoryId: 31,
            name: "Mega Ayoba Meal",
            price: "R119.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/favs-mega-bafana-meal-430x430-1.gif",
          },
          {
            id: 203,
            categoryId: 34,
            name: "Regular Garden Salad",
            price: "R32.90",
            imageUrl: "",
          },
          {
            id: 169,
            categoryId: 34,
            name: "Medium Garden Salad",
            price: "R43.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/salads-garden-salad-430x430-3.png",
          },
          {
            id: 204,
            categoryId: 34,
            name: "Large Garden Salad",
            price: "R51.90",
            imageUrl: "",
          },
          {
            id: 171,
            categoryId: 34,
            name: "Medium Mediterranean Salad",
            price: "R56.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
          },
          {
            id: 172,
            categoryId: 34,
            name: "Large Mediterranean Salad",
            price: "R69.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/salads-mediterranean-Salad-430x430-1.png",
          },
          {
            id: 173,
            categoryId: 34,
            name: "Regular Chicken Salad",
            price: "R73.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
          },
          {
            id: 174,
            categoryId: 34,
            name: "Large Chicken Salad",
            price: "R88.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/salads-chicken-salad-430x430-2.png",
          },
          {
            id: 187,
            categoryId: 37,
            name: "Regular Fries",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          },
          {
            id: 188,
            categoryId: 37,
            name: "Medium Fries",
            price: "R40.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          },
          {
            id: 189,
            categoryId: 37,
            name: "Large Fries",
            price: "R47.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-chips-430x430-2.png",
          },
          {
            id: 181,
            categoryId: 37,
            name: "Regular Pap & Tomato Relish",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-pap-and-relish-430x430-1.gif",
          },
          {
            id: 205,
            categoryId: 37,
            name: "Medium Pap & Tomato Relish",
            price: "R40.90",
            imageUrl: "",
          },
          {
            id: 206,
            categoryId: 37,
            name: "Large Pap & Tomato Relish",
            price: "R47.90",
            imageUrl: "",
          },
          {
            id: 180,
            categoryId: 37,
            name: "Regular Potato Wedges",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-wedges-430x430-1.gif",
          },
          {
            id: 207,
            categoryId: 37,
            name: "Medium Potato Wedges",
            price: "R40.90",
            imageUrl: "",
          },
          {
            id: 208,
            categoryId: 37,
            name: "Large Potato Wedges",
            price: "R47.90",
            imageUrl: "",
          },
          {
            id: 182,
            categoryId: 37,
            name: "Regular Spicy Rice",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-spicy-rice-430x430-1.gif",
          },
          {
            id: 209,
            categoryId: 37,
            name: "Medium Spicy Rice",
            price: "R40.90",
            imageUrl: "",
          },
          {
            id: 210,
            categoryId: 37,
            name: "Large Spicy Rice",
            price: "R47.90",
            imageUrl: "",
          },
          {
            id: 183,
            categoryId: 37,
            name: "Regular 3 Bean Salad",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-3-bean-430x430-1.png",
          },
          {
            id: 211,
            categoryId: 37,
            name: "Medium 3 Bean Salad",
            price: "R40.90",
            imageUrl: "",
          },
          {
            id: 212,
            categoryId: 37,
            name: "Large 3 Bean Salad",
            price: "R47.90",
            imageUrl: "",
          },
          {
            id: 184,
            categoryId: 37,
            name: "Regular Coleslaw",
            price: "R31.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          },
          {
            id: 185,
            categoryId: 37,
            name: "Medium Coleslaw",
            price: "R40.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          },
          {
            id: 186,
            categoryId: 37,
            name: "Large Coleslaw",
            price: "R47.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/sides-coleslaw-430x430-2.png",
          },
          {
            id: 160,
            categoryId: 32,
            name: "Chicken Bowl",
            price: "R67.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-chicken-bowl-430x430-2.png",
          },
          {
            id: 161,
            categoryId: 32,
            name: "Beef Bowl",
            price: "R83.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bowls-beef-430x430-1.png",
          },
          {
            id: 175,
            categoryId: 35,
            name: "Veggie Burger",
            price: "R100.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-burger-with-chips-430x430-1.png",
          },
          {
            id: 176,
            categoryId: 35,
            name: "Veggie Bowl",
            price: "R100.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/bowl-vegeterian-430x430-1.png",
          },
          {
            id: 177,
            categoryId: 35,
            name: "Veggie Schwarma",
            price: "R100.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/vegetarian-schwarma-with-chips-430x430-1.png",
          },
          {
            id: 178,
            categoryId: 36,
            name: "Kids Burger Meal",
            price: "R87.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/kids-burger-meal-2023-430x430-1.png",
          },
          {
            id: 179,
            categoryId: 36,
            name: "Kids Crumbed Chicken Strips & Chips",
            price: "R87.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/kiddies-crumbed-chicken-strips-430x430-1.png",
          },
          {
            id: 190,
            categoryId: 38,
            name: "Mini Breakfast",
            price: "R53.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-mini-430x430-1.png",
          },
          {
            id: 191,
            categoryId: 38,
            name: "Cheesy Egg in Pita",
            price: "R71.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-cheesy-egg-in-pita.png",
          },
          {
            id: 192,
            categoryId: 38,
            name: "Drifter Breakfast",
            price: "R91.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-drifter-430x430-1.png",
          },
          {
            id: 193,
            categoryId: 38,
            name: "Algarve Breakfast",
            price: "R107.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/breakfast-algarve-430x430-1.png",
          },
          {
            id: 194,
            categoryId: 39,
            name: "Soft Drinks 300ml",
            price: "R28.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-440ml-soft-drinks-430x430-1.png",
          },
          {
            id: 198,
            categoryId: 39,
            name: "Valpre 500ml",
            price: "R26.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-valpre-430x430-1.png",
          },
          {
            id: 196,
            categoryId: 39,
            name: "Suntropic Juice 1L",
            price: "R38.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-suntropic-juice-430x430-1.jpg",
          },
          {
            id: 197,
            categoryId: 39,
            name: "Lipton 300ml",
            price: "R22.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2023/08/lipton-lemon-ice-tea.png",
          },
          {
            id: 200,
            categoryId: 39,
            name: "Splash Juice 250ml",
            price: "R10.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/barcelos-drinks-splash-juice-430x430-1.jpg",
          },
          {
            id: 201,
            categoryId: 39,
            name: "Tizers",
            price: "R35.90",
            imageUrl:
              "https://barcelos.co.za/wp-content/uploads/2021/07/drinks-tizers-430x430-1.png",
          },
        ];

        // Delete existing items first
        await tx.delete(menuItems);

        // Insert all items in batches
        const BATCH_SIZE = 50;
        for (let i = 0; i < menuData.length; i += BATCH_SIZE) {
          const batch = menuData.slice(i, i + BATCH_SIZE).map((item) => ({
            id: item.id,
            categoryId: item.categoryId,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl || "/default-dish.png", // Default image for empty URLs
          }));

          await tx.insert(menuItems).values(batch);
        }
      });

      res.json({
        success: true,
        message: "Menu items updated successfully",
        totalItems: menuData.length,
      });
    } catch (error) {
      console.error("Error updating menu items:", error);
      res.status(500).json({
        error: "Failed to update menu items",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // Keep existing menu routes
  app.get("/api/menu", async (_req, res) => {
    try {
      const categories = await db.select().from(menuCategories);
      const items = await db.select().from(menuItems);

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

  const httpServer = createServer(app);
  return httpServer;
}
