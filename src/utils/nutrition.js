// src/utils/nutrition.js

const round = (n, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;

// Approx edible oil density
const OIL_DENSITY_G_PER_ML = 0.91;

/**
 * Empty scaled item shape
 */
function emptyScaled() {
  return {
    grams: 0,
    kcal: 0,
    p: 0,
    c: 0,
    f: 0,
    fiber: 0,
  };
}

/**
 * Scale a food by grams, units, or grams for per10g entries like oil.
 *
 * per100g -> amountInput is grams
 * perUnit  -> amountInput is number of units
 * per10g   -> amountInput is grams
 *
 * @param {object | undefined | null} food
 * @param {number | string} amountInput
 * @returns {{grams:number,kcal:number,p:number,c:number,f:number,fiber:number}}
 */
export function scaleFood(food, amountInput) {
  if (!food || !food.unit || !food.macros) {
    return emptyScaled();
  }

  const amount = Number(amountInput);
  if (!Number.isFinite(amount) || amount <= 0) {
    return emptyScaled();
  }

  let grams = 0;
  let factor = 0;

  switch (food.unit.kind) {
    case "per100g": {
      grams = amount;
      factor = grams / 100;
      break;
    }

    case "perUnit": {
      grams = amount * (food.unit.grams || 0);
      factor = amount;
      break;
    }

    case "per10g": {
      // amount is entered as grams, e.g. 10g oil
      grams = amount;
      factor = grams / (food.unit.grams || 10);
      break;
    }

    default:
      return emptyScaled();
  }

  return {
    grams: Math.round(grams),
    kcal: round((food.macros.kcal || 0) * factor, 0),
    p: round((food.macros.p || 0) * factor),
    c: round((food.macros.c || 0) * factor),
    f: round((food.macros.f || 0) * factor),
    fiber: round((food.macros.fiber || 0) * factor),
  };
}

/**
 * Sum a list of scaled items
 * @param {Array<{grams?:number,kcal?:number,p?:number,c?:number,f?:number,fiber?:number}>} items
 */
export function sumItems(items = []) {
  return {
    grams: Math.round(items.reduce((a, b) => a + (b?.grams || 0), 0)),
    kcal: Math.round(items.reduce((a, b) => a + (b?.kcal || 0), 0)),
    p: round(items.reduce((a, b) => a + (b?.p || 0), 0)),
    c: round(items.reduce((a, b) => a + (b?.c || 0), 0)),
    f: round(items.reduce((a, b) => a + (b?.f || 0), 0)),
    fiber: round(items.reduce((a, b) => a + (b?.fiber || 0), 0)),
  };
}

/**
 * Estimate grams needed to close a calorie gap.
 *
 * Returns grams for per100g/per10g foods.
 * Returns unit count for perUnit foods.
 *
 * @param {object | undefined | null} food
 * @param {number} kcalGap
 * @returns {number}
 */
export function gramsToCloseKcalGap(food, kcalGap) {
  if (!food || !food.unit || !food.macros) return 0;

  const gap = Number(kcalGap);
  if (!Number.isFinite(gap) || gap <= 0) return 0;

  let kcalPerInput = 0;

  switch (food.unit.kind) {
    case "per100g":
      kcalPerInput = (food.macros.kcal || 0) / 100;
      break;

    case "perUnit":
      kcalPerInput = food.macros.kcal || 0;
      break;

    case "per10g":
      kcalPerInput = (food.macros.kcal || 0) / (food.unit.grams || 10);
      break;

    default:
      kcalPerInput = 0;
  }

  if (kcalPerInput <= 0) return 0;

  return Math.max(0, gap / kcalPerInput);
}

/**
 * Convert oil grams to approximate ml/tbsp/tsp
 * @param {number} grams
 */
export function oilVolumeFromGrams(grams) {
  const g = Number(grams);

  if (!Number.isFinite(g) || g <= 0) {
    return { ml: 0, tbsp: 0, tsp: 0 };
  }

  const ml = g / OIL_DENSITY_G_PER_ML;
  const tbsp = ml / 15;
  const tsp = ml / 5;

  return {
    ml: Math.round(ml),
    tbsp: round(tbsp),
    tsp: round(tsp),
  };
}
