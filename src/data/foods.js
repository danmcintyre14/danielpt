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
  // PROTEINS
  { id: "chicken_cooked", name: "Chicken breast (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 165, p: 31, c: 0, f: 3.6 }, tags: ["cooked"] },
  { id: "beef5_cooked", name: "Lean beef 5% (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 180, p: 26, c: 0, f: 8 }, tags: ["cooked"] },
  { id: "salmon_cooked", name: "Salmon (cooked)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 208, p: 22, c: 0, f: 13 }, tags: ["cooked"] },
  { id: "egg_whole", name: "Egg (whole)", group: "protein",
    unit: { kind: "perUnit", grams: 50 }, perLabel: "per 1 egg (~50 g)",
    macros: { kcal: 72, p: 6, c: 0.4, f: 5 } },
  { id: "greek_yogurt_plain", name: "Greek yogurt 0–2% (plain)", group: "protein",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 60, p: 10, c: 3.5, f: 0.6 } },

  // VEG
  { id: "veg_mixed", name: "Mixed non-starchy veg", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 35, p: 2, c: 6, f: 0.3, fiber: 2.5 } },
  { id: "broccoli", name: "Broccoli", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 34, p: 3, c: 7, f: 0.4, fiber: 2.6 } },
  { id: "spinach", name: "Spinach", group: "veg",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 23, p: 3, c: 3.6, f: 0.4, fiber: 2.2 } },

  // CARBS
  { id: "rice_brown_cooked", name: "Whole-grain rice (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 130, p: 2.7, c: 28, f: 1, fiber: 1.8 }, tags: ["cooked","wholegrain"] },
  { id: "potato_plain", name: "Potato (boiled/baked, no fat)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 87, p: 2, c: 20, f: 0.1, fiber: 1.8 } },
  { id: "quinoa_cooked", name: "Quinoa (cooked)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 120, p: 4.4, c: 21, f: 1.9, fiber: 2.8 }, tags: ["cooked"] },
  { id: "pita_ww", name: "Whole-wheat pita", group: "carb",
    unit: { kind: "perUnit", grams: 60 }, perLabel: "per 1 pita (~60 g)",
    macros: { kcal: 165, p: 6, c: 33, f: 1, fiber: 4 } },
  { id: "oats_porridge", name: "Oats (cooked, porridge)", group: "carb",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 71, p: 2.5, c: 12, f: 1.5, fiber: 1.7 } },

  // FATS
  { id: "olive_oil", name: "Olive oil", group: "fat",
    unit: { kind: "per10g", grams: 10 }, perLabel: "per 10 g (~2 tsp)",
    macros: { kcal: 90, p: 0, c: 0, f: 10 } },
  { id: "avocado", name: "Avocado", group: "fat",
    unit: { kind: "per100g" }, perLabel: "per 100 g",
    macros: { kcal: 160, p: 2, c: 9, f: 15, fiber: 7 } },
  { id: "almonds", name: "Almonds", group: "fat",
    unit: { kind: "perUnit", grams: 28 }, perLabel: "per 28 g (small handful)",
    macros: { kcal: 170, p: 6, c: 6, f: 15, fiber: 3.5 } },
];

// Indexes for quick lookup
export const FOOD_BY_ID = Object.fromEntries(FOODS.map(f => [f.id, f]));
export const FOODS_BY_GROUP = {
  protein: FOODS.filter(f => f.group === "protein"),
  veg:     FOODS.filter(f => f.group === "veg"),
  carb:    FOODS.filter(f => f.group === "carb"),
  fat:     FOODS.filter(f => f.group === "fat"),
};
