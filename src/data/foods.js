// src/data/foods.js

/**
 * @typedef {"protein"|"veg"|"carb"|"fat"} FoodGroup
 * @typedef {{kcal:number, p:number, c:number, f:number, fiber?:number}} Macros
 * @typedef {{kind:"per100g"} | {kind:"perUnit", grams:number} | {kind:"per10g", grams:number}} Unit
 * @typedef {{
 *   id: string,
 *   name: string,
 *   group: FoodGroup,
 *   unit: Unit,
 *   perLabel: string,
 *   macros: Macros,
 *   tags?: string[]
 * }} Food
 */

/** @type {Food[]} */
export const FOODS = [
  // ===================== PROTEINS =====================
  {
    id: "chicken_breast_raw",
    name: "Chicken breast (raw)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 120, p: 22.5, c: 0, f: 2.6 },
    tags: ["raw"],
  },

  {
    id: "beef_5_raw",
    name: "Lean beef 5% (raw)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 137, p: 21, c: 0, f: 5 },
    tags: ["raw"],
  },

  {
    id: "salmon_raw",
    name: "Salmon (raw)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 208, p: 20, c: 0, f: 13 },
    tags: ["raw"],
  },

  {
    id: "egg_whole",
    name: "Egg (whole)",
    group: "protein",
    unit: { kind: "perUnit", grams: 50 },
    perLabel: "per 1 egg (~50 g)",
    macros: { kcal: 72, p: 6, c: 0.4, f: 5 },
    tags: ["unit"],
  },

  {
    id: "greek_yogurt_plain",
    name: "Greek yogurt 0–2% (plain)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 60, p: 10, c: 3.5, f: 0.6 },
    tags: ["ready_to_eat"],
  },

  {
    id: "turkey_mince_raw",
    name: "Turkey mince (raw)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 145, p: 19.5, c: 0, f: 7 },
    tags: ["raw"],
  },

  {
    id: "tofu_firm",
    name: "Tofu (firm)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 144, p: 15, c: 3.9, f: 8, fiber: 1 },
    tags: ["ready_to_eat"],
  },

  {
    id: "prawns_raw",
    name: "Prawns (raw)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 85, p: 20, c: 0.2, f: 0.5 },
    tags: ["raw"],
  },

  {
    id: "tuna_canned_drained",
    name: "Tuna (canned, drained)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (drained)",
    macros: { kcal: 132, p: 29, c: 0, f: 1 },
    tags: ["ready_to_eat"],
  },

  {
    id: "cottage_cheese_lowfat",
    name: "Cottage cheese (low-fat)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 82, p: 11.5, c: 3.4, f: 2.3 },
    tags: ["ready_to_eat"],
  },

  {
    id: "whey_protein",
    name: "Whey protein powder",
    group: "protein",
    unit: { kind: "perUnit", grams: 30 },
    perLabel: "per 30 g scoop",
    macros: { kcal: 120, p: 24, c: 2, f: 1.5 },
    tags: ["unit"],
  },

  {
    id: "milk_skimmed",
    name: "Milk (skimmed)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 ml",
    macros: { kcal: 35, p: 3.4, c: 5, f: 0.1 },
    tags: ["ready_to_drink"],
  },

  {
    id: "almond_milk_unsweet",
    name: "Almond milk (unsweetened)",
    group: "protein",
    unit: { kind: "per100g" },
    perLabel: "per 100 ml",
    macros: { kcal: 13, p: 0.4, c: 0.6, f: 1.1 },
    tags: ["ready_to_drink"],
  },

  // ===================== VEGETABLES =====================
  {
    id: "veg_mixed",
    name: "Mixed non-starchy veg",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 35, p: 2, c: 6, f: 0.3, fiber: 2.5 },
    tags: ["raw"],
  },

  {
    id: "broccoli",
    name: "Broccoli",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 34, p: 3, c: 7, f: 0.4, fiber: 2.6 },
    tags: ["raw"],
  },

  {
    id: "spinach",
    name: "Spinach",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 23, p: 3, c: 3.6, f: 0.4, fiber: 2.2 },
    tags: ["raw"],
  },

  {
    id: "kale",
    name: "Kale",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 35, p: 3.3, c: 7, f: 0.6, fiber: 2.6 },
    tags: ["raw"],
  },

  {
    id: "green_beans",
    name: "Green beans",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 31, p: 1.8, c: 7, f: 0.2, fiber: 3.4 },
    tags: ["raw"],
  },

  {
    id: "asparagus",
    name: "Asparagus",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 20, p: 2.2, c: 3.9, f: 0.1, fiber: 2.1 },
    tags: ["raw"],
  },

  {
    id: "bell_pepper",
    name: "Bell pepper",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 31, p: 1, c: 6, f: 0.3, fiber: 2.1 },
    tags: ["raw"],
  },

  {
    id: "zucchini",
    name: "Zucchini",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 17, p: 1.2, c: 3.1, f: 0.3, fiber: 1 },
    tags: ["raw"],
  },

  {
    id: "cauliflower",
    name: "Cauliflower",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 25, p: 2, c: 5, f: 0.3, fiber: 2 },
    tags: ["raw"],
  },

  {
    id: "mushrooms",
    name: "Mushrooms",
    group: "veg",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 22, p: 3.1, c: 3.3, f: 0.3, fiber: 1 },
    tags: ["raw"],
  },

  // ===================== CARBS =====================
  {
    id: "rice_white_raw",
    name: "White rice (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 360, p: 7, c: 79, f: 0.7, fiber: 1 },
    tags: ["raw"],
  },

  {
    id: "rice_brown_raw",
    name: "Whole-grain rice (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 370, p: 7.5, c: 77, f: 2.7, fiber: 3.5 },
    tags: ["raw", "wholegrain"],
  },

  {
    id: "quinoa_raw",
    name: "Quinoa (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 368, p: 14, c: 64, f: 6, fiber: 7 },
    tags: ["raw"],
  },

  {
    id: "pasta_raw",
    name: "Pasta (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 350, p: 12, c: 72, f: 1.5, fiber: 3 },
    tags: ["raw"],
  },

  {
    id: "potato_raw",
    name: "Potato (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 77, p: 2, c: 17, f: 0.1, fiber: 2.2 },
    tags: ["raw"],
  },

  {
    id: "sweet_potato_raw",
    name: "Sweet potato (raw)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (raw)",
    macros: { kcal: 86, p: 1.6, c: 20, f: 0.1, fiber: 3 },
    tags: ["raw"],
  },

  {
    id: "rolled_oats_dry",
    name: "Rolled oats (dry)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (dry)",
    macros: { kcal: 379, p: 13, c: 67, f: 7, fiber: 10 },
    tags: ["raw", "dry"],
  },

  {
    id: "couscous_dry",
    name: "Couscous (dry)",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g (dry)",
    macros: { kcal: 376, p: 12.8, c: 77.4, f: 0.6, fiber: 5 },
    tags: ["raw", "dry"],
  },

  {
    id: "pita_ww",
    name: "Whole-wheat pita",
    group: "carb",
    unit: { kind: "perUnit", grams: 60 },
    perLabel: "per 1 pita (~60 g)",
    macros: { kcal: 165, p: 6, c: 33, f: 1, fiber: 4 },
    tags: ["unit"],
  },

  {
    id: "tortilla_wrap",
    name: "Tortilla wrap",
    group: "carb",
    unit: { kind: "perUnit", grams: 60 },
    perLabel: "per 1 wrap (~60 g)",
    macros: { kcal: 190, p: 6, c: 34, f: 3.5, fiber: 3 },
    tags: ["unit"],
  },

  // ===================== FRUIT =====================
  {
    id: "banana",
    name: "Banana",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 89, p: 1.1, c: 23, f: 0.3, fiber: 2.6 },
    tags: ["fruit"],
  },

  {
    id: "apple",
    name: "Apple",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 52, p: 0.3, c: 14, f: 0.2, fiber: 2.4 },
    tags: ["fruit"],
  },

  {
    id: "blueberries",
    name: "Blueberries",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 57, p: 0.7, c: 14.5, f: 0.3, fiber: 2.4 },
    tags: ["fruit"],
  },

  {
    id: "strawberries",
    name: "Strawberries",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 32, p: 0.7, c: 7.7, f: 0.3, fiber: 2 },
    tags: ["fruit"],
  },

  {
    id: "orange",
    name: "Orange",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 47, p: 0.9, c: 11.8, f: 0.1, fiber: 2.4 },
    tags: ["fruit"],
  },

  {
    id: "grapes",
    name: "Grapes",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 69, p: 0.7, c: 18.1, f: 0.2, fiber: 0.9 },
    tags: ["fruit"],
  },

  {
    id: "pineapple",
    name: "Pineapple",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 50, p: 0.5, c: 13.1, f: 0.1, fiber: 1.4 },
    tags: ["fruit"],
  },

  {
    id: "mango",
    name: "Mango",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 60, p: 0.8, c: 15, f: 0.4, fiber: 1.6 },
    tags: ["fruit"],
  },

  {
    id: "kiwi",
    name: "Kiwi",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 61, p: 1.1, c: 15, f: 0.5, fiber: 3 },
    tags: ["fruit"],
  },

  {
    id: "pear",
    name: "Pear",
    group: "carb",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 57, p: 0.4, c: 15, f: 0.1, fiber: 3.1 },
    tags: ["fruit"],
  },

  // ===================== FATS =====================
  {
    id: "olive_oil",
    name: "Olive oil",
    group: "fat",
    unit: { kind: "per10g", grams: 10 },
    perLabel: "per 10 g (~2 tsp)",
    macros: { kcal: 90, p: 0, c: 0, f: 10 },
    tags: ["fat_source"],
  },

  {
    id: "avocado",
    name: "Avocado",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 160, p: 2, c: 9, f: 15, fiber: 7 },
    tags: ["whole_food_fat"],
  },

  {
    id: "almonds",
    name: "Almonds",
    group: "fat",
    unit: { kind: "perUnit", grams: 28 },
    perLabel: "per 28 g (small handful)",
    macros: { kcal: 170, p: 6, c: 6, f: 15, fiber: 3.5 },
    tags: ["unit"],
  },

  {
    id: "peanut_butter",
    name: "Peanut butter",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 588, p: 25, c: 20, f: 50, fiber: 6 },
    tags: ["spread"],
  },

  {
    id: "chia_seeds",
    name: "Chia seeds",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 486, p: 16, c: 42, f: 31, fiber: 34 },
    tags: ["seeds"],
  },

  {
    id: "flaxseeds",
    name: "Flaxseeds",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 534, p: 18, c: 29, f: 42, fiber: 27 },
    tags: ["seeds"],
  },

  {
    id: "cashews",
    name: "Cashews",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 553, p: 18, c: 30, f: 44, fiber: 3.3 },
    tags: ["nuts"],
  },

  {
    id: "walnuts",
    name: "Walnuts",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 654, p: 15, c: 14, f: 65, fiber: 7 },
    tags: ["nuts"],
  },

  {
    id: "pumpkin_seeds",
    name: "Pumpkin seeds",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 559, p: 30, c: 11, f: 49, fiber: 6 },
    tags: ["seeds"],
  },

  {
    id: "coconut_dried",
    name: "Coconut (dried)",
    group: "fat",
    unit: { kind: "per100g" },
    perLabel: "per 100 g",
    macros: { kcal: 660, p: 7, c: 24, f: 65, fiber: 16 },
    tags: ["dried"],
  },
];

// Indexes for quick lookup
export const FOOD_BY_ID = Object.fromEntries(FOODS.map((f) => [f.id, f]));

export const FOODS_BY_GROUP = {
  protein: FOODS.filter((f) => f.group === "protein"),
  veg: FOODS.filter((f) => f.group === "veg"),
  carb: FOODS.filter((f) => f.group === "carb"),
  fat: FOODS.filter((f) => f.group === "fat"),
};


