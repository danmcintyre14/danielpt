// src/utils/nutrition.js
import { COOKED_TO_RAW } from "../data/yields";

const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
// Assume edible oil density ≈ 0.91 g/ml (close enough for client estimates)
const OIL_DENSITY_G_PER_ML = 0.91;

/**
 * @param {import("../data/foods").FOODS[number]} food
 * @param {number} amountInput
 * @returns {{grams:number,kcal:number,p:number,c:number,f:number,fiber:number}}
 */
export function scaleFood(food, amountInput) {
  let grams, factor;

  switch (food.unit.kind) {
    case "per100g":
      grams = amountInput;           // grams
      factor = grams / 100;
      break;
    case "perUnit":
      grams = amountInput * food.unit.grams;
      factor = amountInput;          // per 1 unit
      break;
    case "per10g":
      grams = amountInput * food.unit.grams; // units of 10 g
      factor = amountInput;          // per 10 g
      break;
    default:
      grams = 0; factor = 0;
  }

  return {
    grams: Math.round(grams),
    kcal:  round(food.macros.kcal  * factor, 0),
    p:     round(food.macros.p     * factor),
    c:     round(food.macros.c     * factor),
    f:     round(food.macros.f     * factor),
    fiber: round((food.macros.fiber || 0) * factor),
  };
}

/** Sum a list of scaled items */
export function sumItems(items) {
  return {
    grams: items.reduce((a, b) => a + (b.grams || 0), 0),
    kcal:  items.reduce((a, b) => a + (b.kcal  || 0), 0),
    p:     round(items.reduce((a, b) => a + (b.p     || 0), 0)),
    c:     round(items.reduce((a, b) => a + (b.c     || 0), 0)),
    f:     round(items.reduce((a, b) => a + (b.f     || 0), 0)),
    fiber: round(items.reduce((a, b) => a + (b.fiber || 0), 0)),
  };
}

/** Rough grams to add/remove of a chosen food to close a calorie gap */
export function gramsToCloseKcalGap(food, kcalGap) {
  let kcalPerGram;
  switch (food.unit.kind) {
    case "per100g": kcalPerGram = food.macros.kcal / 100; break;
    case "perUnit": kcalPerGram = food.macros.kcal / food.unit.grams; break;
    case "per10g":  kcalPerGram = food.macros.kcal / food.unit.grams; break;
    default:        kcalPerGram = 0;
  }
  if (kcalPerGram <= 0) return 0;
  return Math.max(0, Math.round(kcalGap / kcalPerGram));
}

/** Estimate RAW grams required for the given cooked grams (uses COOKED_TO_RAW_FACTOR) */
export function cookedToRaw(foodId, cookedGrams) {
  const factor = COOKED_TO_RAW[foodId] ?? 1.0;
  return Math.round(cookedGrams * factor);
}

/** Convert oil grams → ml and tbsp */
export function oilVolumeFromGrams(grams) {
  const ml = grams / OIL_DENSITY_G_PER_ML;
  const tbsp = ml / 15;        // kitchen rule of thumb: 1 tbsp ≈ 15 ml
  const tsp  = ml / 5;         // 1 tsp ≈ 5 ml
  return {
    ml: Math.round(ml),
    tbsp: Math.round(tbsp * 10) / 10,
    tsp: Math.round(tsp * 10) / 10,
  };
}
