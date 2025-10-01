// src/data/yields.js

/**
 * COOKED_TO_RAW multipliers
 * Meaning: raw_g = served_g × multiplier
 *
 * Heuristics:
 * - Lean meats/fish lose water when cooked → need MORE raw (×1.20–1.33)
 * - Grains/pasta absorb water when cooked → need LESS raw (×0.33–0.42)
 * - Veg & fruits typically bought/served as-is → ×1.00
 * - Fats/nuts/spreads/oils → ×1.00
 * - Powders/liquids like whey or milk → ×1.00 (measure and buy as-is)
 */
export const COOKED_TO_RAW = {
  /* ===== PROTEIN ===== */
  chicken_cooked:        1.33,
  beef5_cooked:          1.25,
  salmon_cooked:         1.20,
  turkey_minced_cooked:  1.25,
  prawns_cooked:         1.20,

  egg_whole:             1.00,
  greek_yogurt_plain:    1.00,
  tofu_firm:             1.00,
  tuna_canned_drained:   1.00,
  cottage_cheese_lowfat: 1.00,

  // NEW protein additions
  whey_protein:              1.00, // scoop-based powder → buy/measure as-is
  milk_skimmed:              1.00, // per 100 ml ≈ 100 g; buy as-is
  almond_milk_unsweet:   1.00, // per 100 ml; buy as-is

  /* ===== VEGETABLES ===== */
  veg_mixed:    1.00,
  broccoli:     1.00,
  spinach:      1.00,
  kale:         1.00,
  green_beans:  1.00,
  asparagus:    1.00,
  bell_pepper:  1.00,
  zucchini:     1.00,
  cauliflower:  1.00,
  mushrooms:    1.00,

  /* ===== CARBS (grains/tubers/bakery) ===== */
  rice_white_cooked: 0.33,
  rice_brown_cooked: 0.33,
  quinoa_cooked:     0.37,
  pasta_cooked:      0.42,
  couscous_cooked:   0.33,

  potato_plain:        1.10,
  sweet_potato_baked:  1.10,

  rolled_oats_dry: 1.00,
  pita_ww:         1.00,
  tortilla_wrap:   1.00,

  /* ===== FRUIT (carb options) ===== */
  banana:       1.00,
  apple:        1.00,
  blueberries:  1.00,
  strawberries: 1.00,
  orange:       1.00,
  grapes:       1.00,
  pineapple:    1.00,
  mango:        1.00,
  kiwi:         1.00,
  pear:         1.00,

  /* ===== FATS ===== */
  olive_oil:     1.00,
  avocado:       1.00,
  almonds:       1.00,
  peanut_butter: 1.00,
  chia_seeds:    1.00,
  flaxseeds:     1.00,
  cashews:       1.00,
  walnuts:       1.00,
  pumpkin_seeds: 1.00,
  coconut_dried: 1.00,
};

// Back-compat alias (your utils can import COOKED_TO_RAW_FACTOR)
export const COOKED_TO_RAW_FACTOR = COOKED_TO_RAW;

/**
 * Convert a cooked/served weight (g) into a grocery/raw weight (g).
 * Unknown IDs default to multiplier 1.00.
 */
export function cookedToRaw(foodId, servedGrams) {
  const mult = COOKED_TO_RAW[foodId] ?? 1.0;
  return Math.round((servedGrams || 0) * mult);
}



