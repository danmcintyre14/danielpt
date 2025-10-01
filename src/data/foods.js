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
 *   tags?: string[],
 *   density?: "cooked"|"raw"
 * }} Food
 */

/** @type {Food[]} */
export const FOODS = [
  // ===================== PROTEINS (10) =====================
  { id: "chicken_cooked", name: "Chicken breast (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 165, p: 31, c: 0, f: 3.6 }, tags: ["cooked"], density: "cooked" },

  { id: "beef5_cooked", name: "Lean beef 5% (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 180, p: 26, c: 0, f: 8 }, tags: ["cooked"], density: "cooked" },

  { id: "salmon_cooked", name: "Salmon (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 208, p: 22, c: 0, f: 13 }, tags: ["cooked"], density: "cooked" },

  { id: "egg_whole", name: "Egg (whole)", group: "protein",
    unit: { kind: "perUnit", grams: 50 }, perLabel: "per 1 egg (~50 g)",
    macros: { kcal: 72, p: 6, c: 0.4, f: 5 }, density: "raw" },

  { id: "greek_yogurt_plain", name: "Greek yogurt 0–2% (plain)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 60, p: 10, c: 3.5, f: 0.6 }, density: "raw" },

  { id: "turkey_minced_cooked", name: "Turkey mince (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 189, p: 27, c: 0, f: 8 }, tags: ["cooked"], density: "cooked" },

  { id: "tofu_firm", name: "Tofu (firm)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 144, p: 15, c: 3.9, f: 8, fiber: 1 }, density: "raw" },

  { id: "prawns_cooked", name: "Prawns (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 99, p: 24, c: 0.2, f: 0.3 }, tags: ["cooked"], density: "cooked" },

  { id: "tuna_canned_drained", name: "Tuna (canned, drained)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g (drained)",
    macros: { kcal: 132, p: 29, c: 0, f: 1 }, density: "raw" },

  { id: "cottage_cheese_lowfat", name: "Cottage cheese (low-fat)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 82, p: 11.5, c: 3.4, f: 2.3 }, density: "raw" },

  {
  id: "whey_protein", name: "Whey protein powder (unflavoured)", group: "protein",
  unit: { kind: "perUnit", grams: 30 }, // 1 scoop ~30g
  perLabel: "per 30 g scoop",
  macros: { kcal: 120, p: 24, c: 2, f: 1.5 },
   },

{
  id: "milk_skimmed", name: "Milk (skimmed)", group: "protein",
  unit: { kind: "per100g" }, // ~100 ml
  perLabel: "per 100 ml",
  macros: { kcal: 35, p: 3.4, c: 5, f: 0.1 },
   },

{
  id: "almond_milk_unsweet", name: "Almond milk (unsweetened)", group: "protein",
  unit: { kind: "per100g" }, // ~100 ml
  perLabel: "per 100 ml",
  macros: { kcal: 13, p: 0.4, c: 0.6, f: 1.1 },
}, 

  // ===================== VEGETABLES (10) =====================
  { id: "veg_mixed", name: "Mixed non-starchy veg", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 35, p: 2, c: 6, f: 0.3, fiber: 2.5 }, density: "raw" },

  { id: "broccoli", name: "Broccoli", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 34, p: 3, c: 7, f: 0.4, fiber: 2.6 }, density: "raw" },

  { id: "spinach", name: "Spinach", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 23, p: 3, c: 3.6, f: 0.4, fiber: 2.2 }, density: "raw" },

  { id: "kale", name: "Kale", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 35, p: 3.3, c: 7, f: 0.6, fiber: 2.6 }, density: "raw" },

  { id: "green_beans", name: "Green beans", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 31, p: 1.8, c: 7, f: 0.2, fiber: 3.4 }, density: "raw" },

  { id: "asparagus", name: "Asparagus", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 20, p: 2.2, c: 3.9, f: 0.1, fiber: 2.1 }, density: "raw" },

  { id: "bell_pepper", name: "Bell pepper", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 31, p: 1, c: 6, f: 0.3, fiber: 2.1 }, density: "raw" },

  { id: "zucchini", name: "Zucchini", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 17, p: 1.2, c: 3.1, f: 0.3, fiber: 1 }, density: "raw" },

  { id: "cauliflower", name: "Cauliflower", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 25, p: 2, c: 5, f: 0.3, fiber: 2 }, density: "raw" },

  { id: "mushrooms", name: "Mushrooms", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 22, p: 3.1, c: 3.3, f: 0.3, fiber: 1 }, density: "raw" },

  // ===================== CARBS (10 + fruit entries) =====================
  { id: "rice_white_cooked", name: "White rice (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 130, p: 2.4, c: 28.2, f: 0.3, fiber: 0.4 }, tags: ["cooked"], density: "cooked" },

  { id: "rice_brown_cooked", name: "Whole-grain rice (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 123, p: 2.6, c: 25.6, f: 1, fiber: 1.8 }, tags: ["cooked","wholegrain"], density: "cooked" },

  { id: "quinoa_cooked", name: "Quinoa (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 120, p: 4.4, c: 21, f: 1.9, fiber: 2.8 }, tags: ["cooked"], density: "cooked" },

  { id: "pasta_cooked", name: "Pasta (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 131, p: 5, c: 25, f: 1.1, fiber: 1.3 }, tags: ["cooked"], density: "cooked" },

  { id: "potato_plain", name: "Potato (boiled/baked, no fat)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 87, p: 2, c: 20, f: 0.1, fiber: 1.8 }, density: "cooked" },

  { id: "sweet_potato_baked", name: "Sweet potato (baked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 90, p: 2, c: 21, f: 0.1, fiber: 3.0 }, density: "cooked" },

  // Dry grain
  { id: "rolled_oats_dry", name: "Rolled oats (dry)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g (dry)",
    macros: { kcal: 379, p: 13, c: 67, f: 7, fiber: 10 }, density: "raw" },

  { id: "couscous_cooked", name: "Couscous (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 112, p: 3.8, c: 23, f: 0.2, fiber: 1.4 }, tags: ["cooked"], density: "cooked" },

  { id: "pita_ww", name: "Whole-wheat pita", group: "carb",
    unit: { kind: "perUnit", grams: 60 }, perLabel: "per 1 pita (~60 g)",
    macros: { kcal: 165, p: 6, c: 33, f: 1, fiber: 4 }, density: "raw" },

  { id: "tortilla_wrap", name: "Tortilla wrap", group: "carb",
    unit: { kind: "perUnit", grams: 60 }, perLabel: "per 1 wrap (~60 g)",
    macros: { kcal: 190, p: 6, c: 34, f: 3.5, fiber: 3 }, density: "raw" },

  // --- FRUIT (carb options; tag: "fruit") ---
  { id: "banana", name: "Banana", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 89, p: 1.1, c: 23, f: 0.3, fiber: 2.6 }, tags: ["fruit"], density: "raw" },

  { id: "apple", name: "Apple", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 52, p: 0.3, c: 14, f: 0.2, fiber: 2.4 }, tags: ["fruit"], density: "raw" },

  { id: "blueberries", name: "Blueberries", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 57, p: 0.7, c: 14.5, f: 0.3, fiber: 2.4 }, tags: ["fruit"], density: "raw" },

  { id: "strawberries", name: "Strawberries", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 32, p: 0.7, c: 7.7, f: 0.3, fiber: 2.0 }, tags: ["fruit"], density: "raw" },

  { id: "orange", name: "Orange", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 47, p: 0.9, c: 11.8, f: 0.1, fiber: 2.4 }, tags: ["fruit"], density: "raw" },

  { id: "grapes", name: "Grapes", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 69, p: 0.7, c: 18.1, f: 0.2, fiber: 0.9 }, tags: ["fruit"], density: "raw" },

  { id: "pineapple", name: "Pineapple", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 50, p: 0.5, c: 13.1, f: 0.1, fiber: 1.4 }, tags: ["fruit"], density: "raw" },

  { id: "mango", name: "Mango", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 60, p: 0.8, c: 15, f: 0.4, fiber: 1.6 }, tags: ["fruit"], density: "raw" },

  { id: "kiwi", name: "Kiwi", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 61, p: 1.1, c: 15, f: 0.5, fiber: 3.0 }, tags: ["fruit"], density: "raw" },

  { id: "pear", name: "Pear", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 57, p: 0.4, c: 15, f: 0.1, fiber: 3.1 }, tags: ["fruit"], density: "raw" },

  // ===================== FATS (10) =====================
  { id: "olive_oil", name: "Olive oil", group: "fat",
    unit: { kind: "per10g", grams: 10 }, perLabel: "per 10 g (~2 tsp)",
    macros: { kcal: 90, p: 0, c: 0, f: 10 }, density: "raw" },

  { id: "avocado", name: "Avocado", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 160, p: 2, c: 9, f: 15, fiber: 7 }, density: "raw" },

  { id: "almonds", name: "Almonds", group: "fat",
    unit: { kind: "perUnit", grams: 28 }, perLabel: "per 28 g (small handful)",
    macros: { kcal: 170, p: 6, c: 6, f: 15, fiber: 3.5 }, density: "raw" },

  { id: "peanut_butter", name: "Peanut butter", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 588, p: 25, c: 20, f: 50, fiber: 6 }, density: "raw" },

  { id: "chia_seeds", name: "Chia seeds", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 486, p: 16, c: 42, f: 31, fiber: 34 }, density: "raw" },

  { id: "flaxseeds", name: "Flaxseeds", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 534, p: 18, c: 29, f: 42, fiber: 27 }, density: "raw" },

  { id: "cashews", name: "Cashews", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 553, p: 18, c: 30, f: 44, fiber: 3.3 }, density: "raw" },

  { id: "walnuts", name: "Walnuts", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 654, p: 15, c: 14, f: 65, fiber: 7 }, density: "raw" },

  { id: "pumpkin_seeds", name: "Pumpkin seeds", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 559, p: 30, c: 11, f: 49, fiber: 6 }, density: "raw" },

  { id: "coconut_dried", name: "Coconut (dried)", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 660, p: 7, c: 24, f: 65, fiber: 16 }, density: "raw" },
];

// Indexes for quick lookup
export const FOOD_BY_ID = Object.fromEntries(FOODS.map(f => [f.id, f]));
export const FOODS_BY_GROUP = {
  protein: FOODS.filter(f => f.group === "protein"),
  veg:     FOODS.filter(f => f.group === "veg"),
  carb:    FOODS.filter(f => f.group === "carb"),
  fat:     FOODS.filter(f => f.group === "fat"),
};


