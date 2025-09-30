// src/data/yields.js
/**
 * Estimated raw weight needed to yield X g cooked.
 * Store as a multiplier: raw = cooked_g * factor
 * (Values are ballpark; refine per your kitchen tests.)
 */
export const COOKED_TO_RAW_FACTOR = {
  // PROTEINS (water loss when cooking)
  chicken_cooked: 1.33,      // 100g cooked ≈ 133g raw (≈25% loss)
  beef5_cooked: 1.30,
  salmon_cooked: 1.25,
  egg_whole: 1.00,           // eggs kept as “per unit”; raw≈cooked

  // CARBS (water absorbed when cooking; factor < 1)
  rice_brown_cooked: 0.33,   // 100g cooked ≈ 33g raw dry rice
  quinoa_cooked: 0.33,
  oats_porridge: 0.30,       // 100g porridge ≈ 30g dry oats
  potato_plain: 1.00,        // boiled potato close to raw weight

  // VEG (light shrinkage; treat as ≈1.0 unless you’d like 1.1)
  veg_mixed: 1.00,
  broccoli: 1.05,
  spinach: 1.20,             // big wilt → more raw needed

  // FATS / oils (kept as is; raw=cooked)
  olive_oil: 1.00,
  avocado: 1.00,
  almonds: 1.00,
  pita_ww: 1.00,             // per-unit items leave as-is
  greek_yogurt_plain: 1.00,
};
