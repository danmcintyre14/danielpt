import { useMemo, useState } from "react";
import { FaUtensils } from "react-icons/fa";

import styles from "./ModularMealBuilder.module.css";

import {
  FOODS_BY_GROUP,
  FOOD_BY_ID,
} from "../../data/foods";

import {
  scaleFood,
  sumItems,
} from "../../utils/nutrition";

const DEFAULTS = {
  calories: 600,
  protein: 40,
  proteinId: "chicken_breast_raw",
  carbId: "rice_white_raw",
  vegId: "veg_mixed",
  fatId: "",
};

export default function ModularMealBuilder() {
  const [isOpen, setIsOpen] = useState(false);

  const [targetCalories, setTargetCalories] = useState(
    DEFAULTS.calories
  );

  const [targetProtein, setTargetProtein] = useState(
    DEFAULTS.protein
  );

  const [proteinId, setProteinId] = useState(
    DEFAULTS.proteinId
  );

  const [carbId, setCarbId] = useState(
    DEFAULTS.carbId
  );

  const [vegId, setVegId] = useState(
    DEFAULTS.vegId
  );

  const [fatId, setFatId] = useState(
    DEFAULTS.fatId
  );

  const [mealCount, setMealCount] = useState(4);

  /* =========================
     FOOD OPTIONS
  ========================= */

  const carbOptions = useMemo(
    () =>
      FOODS_BY_GROUP.carb.filter(
        (food) =>
          !(food.tags || []).includes("fruit")
      ),
    []
  );

  /* =========================
     MEAL CALCULATION
  ========================= */

  const calculation = useMemo(() => {
    const proteinFood =
      FOOD_BY_ID[proteinId] || null;

    const carbFood =
      FOOD_BY_ID[carbId] || null;

    const vegFood =
      FOOD_BY_ID[vegId] || null;

    const fatFood =
      FOOD_BY_ID[fatId] || null;

    /*
      Fixed parts of the meal first.

      Vegetables:
      150 g practical default.

      Optional fat:
      sensible default portion based on food.
    */

    const vegAmount = vegFood ? 150 : 0;

    const fatAmount = fatFood
      ? getDefaultFatAmount(fatFood)
      : 0;

    const vegItem =
      vegFood && vegAmount > 0
        ? safeScaleFood(vegFood, vegAmount)
        : empty();

    const fatItem =
      fatFood && fatAmount > 0
        ? safeScaleFood(fatFood, fatAmount)
        : empty();

    /*
      Find the best combination of protein
      food + carbohydrate food.

      Instead of making the main protein food
      hit the protein target by itself, we test
      practical portions and score the FINAL
      meal against both:

      - target calories
      - target protein

      This means protein from rice, potato,
      oats, vegetables etc. counts toward the
      meal's protein target.
    */

    const bestCombination =
      findBestMealCombination({
        proteinFood,
        carbFood,
        vegItem,
        fatItem,
        targetCalories,
        targetProtein,
      });

    const proteinAmount =
      bestCombination.proteinAmount;

    const carbAmount =
      bestCombination.carbAmount;

    const proteinItem =
      proteinFood && proteinAmount > 0
        ? safeScaleFood(
            proteinFood,
            proteinAmount
          )
        : empty();

    const carbItem =
      carbFood && carbAmount > 0
        ? safeScaleFood(
            carbFood,
            carbAmount
          )
        : empty();

    const total = sumItems([
      proteinItem,
      carbItem,
      vegItem,
      fatItem,
    ]);

    const items = [
      proteinFood && proteinAmount > 0
        ? createMealItem(
            proteinFood,
            proteinAmount,
            proteinItem
          )
        : null,

      carbFood && carbAmount > 0
        ? createMealItem(
            carbFood,
            carbAmount,
            carbItem
          )
        : null,

      vegFood && vegAmount > 0
        ? createMealItem(
            vegFood,
            vegAmount,
            vegItem
          )
        : null,

      fatFood && fatAmount > 0
        ? createMealItem(
            fatFood,
            fatAmount,
            fatItem
          )
        : null,
    ].filter(Boolean);

    return {
      total,
      items,

      calorieDifference:
        total.kcal - targetCalories,

      proteinDifference:
        total.p - targetProtein,
    };
  }, [
    targetCalories,
    targetProtein,
    proteinId,
    carbId,
    vegId,
    fatId,
  ]);

  /* =========================
     RESET
  ========================= */

  const handleReset = () => {
    setTargetCalories(DEFAULTS.calories);
    setTargetProtein(DEFAULTS.protein);
    setProteinId(DEFAULTS.proteinId);
    setCarbId(DEFAULTS.carbId);
    setVegId(DEFAULTS.vegId);
    setFatId(DEFAULTS.fatId);
    setMealCount(4);
  };

  return (
    <div className={styles.container}>
      {/* CLOSED CARD */}

      {!isOpen && (
        <button
          type="button"
          className={styles.openBtn}
          onClick={() => setIsOpen(true)}
        >
          <FaUtensils className={styles.icon} />

          <span>Meal Builder</span>
        </button>
      )}

      {/* OPEN BUILDER */}

      {isOpen && (
        <div className={styles.builderCard}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close meal builder"
          >
            ✕
          </button>

          <span className={styles.eyebrow}>
            NUTRITION TOOL
          </span>

          <h2 className={styles.title}>
            Meal Builder
          </h2>

          <p className={styles.intro}>
            Set your calorie and protein target,
            choose the foods you want to eat and
            The Rebuild will calculate practical
            portions for your meal.
          </p>

          {/* 01 TARGETS */}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>01</span>

              <div>
                <h3>Set your meal target</h3>

                <p>
                  Enter approximately how many
                  calories and how much protein you
                  want in this meal.
                </p>
              </div>
            </div>

            <div className={styles.targetGrid}>
              <label className={styles.formGroup}>
                <span>Calories</span>

                <div className={styles.inputWithUnit}>
                  <input
                    type="number"
                    min="100"
                    max="2000"
                    step="25"
                    value={targetCalories}
                    onChange={(e) =>
                      setTargetCalories(
                        clamp(
                          Number(e.target.value),
                          100,
                          2000
                        )
                      )
                    }
                  />

                  <small>kcal</small>
                </div>
              </label>

              <label className={styles.formGroup}>
                <span>Protein</span>

                <div className={styles.inputWithUnit}>
                  <input
                    type="number"
                    min="10"
                    max="150"
                    step="5"
                    value={targetProtein}
                    onChange={(e) =>
                      setTargetProtein(
                        clamp(
                          Number(e.target.value),
                          10,
                          150
                        )
                      )
                    }
                  />

                  <small>g</small>
                </div>
              </label>
            </div>
          </section>

          {/* 02 FOOD CHOICES */}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>02</span>

              <div>
                <h3>Choose your foods</h3>

                <p>
                  Pick the foods you want to use.
                  We'll calculate the portions.
                </p>
              </div>
            </div>

            <div className={styles.foodChoiceGrid}>
              <SelectField
                label="Protein"
                value={proteinId}
                onChange={setProteinId}
                options={FOODS_BY_GROUP.protein}
              />

              <SelectField
                label="Carbohydrate"
                value={carbId}
                onChange={setCarbId}
                options={carbOptions}
              />

              <SelectField
                label="Vegetables"
                value={vegId}
                onChange={setVegId}
                options={FOODS_BY_GROUP.veg}
                allowNone
              />

              <SelectField
                label="Added fat"
                value={fatId}
                onChange={setFatId}
                options={FOODS_BY_GROUP.fat}
                allowNone
              />
            </div>

            <p className={styles.weightNote}>
              Portions are shown as raw weights
              where appropriate. Ready-to-eat foods
              are shown as eaten or drained.
            </p>
          </section>

          {/* 03 YOUR MEAL */}

          <section className={styles.mealSection}>
            <div className={styles.sectionHeader}>
              <span>03</span>

              <div>
                <h3>Your meal</h3>

                <p>
                  These portions are calculated as
                  a practical starting point.
                </p>
              </div>
            </div>

            <div className={styles.mealList}>
              {calculation.items.map((item) => (
                <div
                  key={item.id}
                  className={styles.mealItem}
                >
                  <div>
                    <strong>
                      {item.displayName}
                    </strong>

                    <span>
                      {item.preparationLabel}
                    </span>
                  </div>

                  <div
                    className={
                      styles.mealItemAmount
                    }
                  >
                    {item.displayAmount}
                  </div>
                </div>
              ))}
            </div>

            {/* TOTALS */}

            <div className={styles.totalCard}>
              <span className={styles.totalLabel}>
                ESTIMATED MEAL
              </span>

              <div className={styles.calorieTotal}>
                <strong>
                  {Math.round(
                    calculation.total.kcal
                  )}
                </strong>

                <span>kcal</span>
              </div>

              <div className={styles.macroGrid}>
                <Macro
                  label="Protein"
                  value={`${Math.round(
                    calculation.total.p
                  )} g`}
                />

                <Macro
                  label="Carbs"
                  value={`${Math.round(
                    calculation.total.c
                  )} g`}
                />

                <Macro
                  label="Fat"
                  value={`${Math.round(
                    calculation.total.f
                  )} g`}
                />

                <Macro
                  label="Fibre"
                  value={`${Math.round(
                    calculation.total.fiber
                  )} g`}
                />
              </div>
            </div>

            <MealFeedback
              calorieDifference={
                calculation.calorieDifference
              }
              proteinDifference={
                calculation.proteinDifference
              }
              targetCalories={targetCalories}
              targetProtein={targetProtein}
            />

            <p className={styles.disclaimer}>
              Nutrition values are estimates.
              Products, brands and food composition
              vary, so check nutrition labels when
              greater accuracy is required.
            </p>
          </section>

          {/* 04 MEAL PREP */}

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span>04</span>

              <div>
                <h3>Meal prep</h3>

                <p>
                  Making more than one? We'll
                  calculate how much food you need.
                </p>
              </div>
            </div>

            <div className={styles.mealCountControl}>
              <button
                type="button"
                onClick={() =>
                  setMealCount((count) =>
                    Math.max(1, count - 1)
                  )
                }
                aria-label="Reduce number of meals"
              >
                −
              </button>

              <div>
                <strong>{mealCount}</strong>

                <span>
                  {mealCount === 1
                    ? "meal"
                    : "meals"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMealCount((count) =>
                    Math.min(20, count + 1)
                  )
                }
                aria-label="Increase number of meals"
              >
                +
              </button>
            </div>

            <div className={styles.prepList}>
              {calculation.items.map((item) => (
                <div
                  key={item.id}
                  className={styles.prepItem}
                >
                  <span>
                    {item.displayName}
                  </span>

                  <strong>
                    {formatPrepAmount(
                      item,
                      mealCount
                    )}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIONS */}

          <div className={styles.footerActions}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
            >
              Reset meal
            </button>

            <button
              type="button"
              className={styles.doneBtn}
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================
   FIND BEST MEAL COMBINATION
======================================== */

function findBestMealCombination({
  proteinFood,
  carbFood,
  vegItem,
  fatItem,
  targetCalories,
  targetProtein,
}) {
  if (!proteinFood || !carbFood) {
    return {
      proteinAmount: 0,
      carbAmount: 0,
    };
  }

  const proteinAmounts =
    getCandidateAmounts(
      proteinFood,
      "protein"
    );

  const carbAmounts =
    getCandidateAmounts(
      carbFood,
      "carb"
    );

  let best = null;

  for (
    const proteinAmount
    of proteinAmounts
  ) {
    const proteinItem =
      safeScaleFood(
        proteinFood,
        proteinAmount
      );

    for (
      const carbAmount
      of carbAmounts
    ) {
      const carbItem =
        safeScaleFood(
          carbFood,
          carbAmount
        );

      const total = sumItems([
        proteinItem,
        carbItem,
        vegItem,
        fatItem,
      ]);

      const calorieDifference =
        total.kcal -
        targetCalories;

      const proteinDifference =
        total.p -
        targetProtein;

      /*
        SCORE

        Protein and calories are both
        important, but we don't want to
        sacrifice a large amount of protein
        simply to land on the exact calorie
        number.

        Relative errors make the scoring
        work across different meal targets.
      */

      const calorieError =
        Math.abs(
          calorieDifference
        ) /
        Math.max(
          targetCalories,
          1
        );

      const proteinError =
        Math.abs(
          proteinDifference
        ) /
        Math.max(
          targetProtein,
          1
        );

      /*
        Slight penalty for falling below
        protein target.

        Being 3 g over protein is generally
        preferable to being 3 g under.
      */

      const proteinUnderPenalty =
        proteinDifference < 0
          ? Math.abs(
              proteinDifference
            ) /
            Math.max(
              targetProtein,
              1
            ) *
            0.35
          : 0;

      /*
        Penalise meals that overshoot
        calories significantly.
      */

      const calorieOverPenalty =
        calorieDifference > 50
          ? calorieError * 0.5
          : 0;

      const score =
        calorieError +
        proteinError * 1.35 +
        proteinUnderPenalty +
        calorieOverPenalty;

      if (
        !best ||
        score < best.score
      ) {
        best = {
          proteinAmount,
          carbAmount,
          total,
          score,
        };
      }
    }
  }

  return (
    best || {
      proteinAmount: 0,
      carbAmount: 0,
    }
  );
}

/* ========================================
   PRACTICAL PORTION CANDIDATES
======================================== */

function getCandidateAmounts(
  food,
  role
) {
  if (!food) {
    return [0];
  }

  /*
    Foods measured per 100 g.

    Protein:
    test 50–400 g in 5 g increments.

    Carbohydrate:
    test 0–500 g in 5 g increments.

    This accommodates both energy-dense
    foods such as rice and lower-calorie
    foods such as potato.
  */

  if (
    food.unit.kind ===
    "per100g"
  ) {
    const start =
      role === "protein"
        ? 50
        : 0;

    const end =
      role === "protein"
        ? 400
        : 500;

    const amounts = [];

    for (
      let amount = start;
      amount <= end;
      amount += 5
    ) {
      amounts.push(amount);
    }

    return amounts;
  }

  /*
    Unit foods.

    Eggs, wraps, pita etc. use whole
    units.

    Whey is allowed in half-scoop
    increments.
  */

  if (
    food.unit.kind ===
    "perUnit"
  ) {
    if (
      food.id ===
      "whey_protein"
    ) {
      const amounts = [];

      for (
        let amount = 0.5;
        amount <= 5;
        amount += 0.5
      ) {
        amounts.push(amount);
      }

      return amounts;
    }

    const amounts = [];

    for (
      let amount = 1;
      amount <= 8;
      amount += 1
    ) {
      amounts.push(amount);
    }

    return amounts;
  }

  /*
    Per 10 g foods.
  */

  if (
    food.unit.kind ===
    "per10g"
  ) {
    const amounts = [];

    for (
      let amount = 0;
      amount <= 10;
      amount += 0.5
    ) {
      amounts.push(amount);
    }

    return amounts;
  }

  return [0];
}

/* ========================================
   SELECT FIELD
======================================== */

function SelectField({
  label,
  value,
  onChange,
  options,
  allowNone = false,
}) {
  return (
    <label className={styles.formGroup}>
      <span>{label}</span>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        {allowNone && (
          <option value="">
            None
          </option>
        )}

        {options.map((food) => (
          <option
            key={food.id}
            value={food.id}
          >
            {getCleanFoodName(
              food.name
            )}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ========================================
   MACRO
======================================== */

function Macro({
  label,
  value,
}) {
  return (
    <div className={styles.macro}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ========================================
   FEEDBACK

   No success message.

   Only show feedback when the chosen
   foods cannot get reasonably close.
======================================== */

function MealFeedback({
  calorieDifference,
  proteinDifference,
  targetCalories,
  targetProtein,
}) {
  const calorieTolerance =
    Math.max(
      50,
      targetCalories * 0.08
    );

  const proteinTolerance =
    Math.max(
      5,
      targetProtein * 0.12
    );

  const caloriesAreClose =
    Math.abs(
      calorieDifference
    ) <= calorieTolerance;

  const proteinIsClose =
    Math.abs(
      proteinDifference
    ) <= proteinTolerance;

  if (
    caloriesAreClose &&
    proteinIsClose
  ) {
    return null;
  }

  return (
    <div className={styles.feedback}>
      <strong>
        Your food choices make this target
        difficult to match
      </strong>

      <p>
        Try choosing a leaner protein source,
        changing your carbohydrate choice or
        adjusting your calorie or protein
        target.
      </p>
    </div>
  );
}

/* ========================================
   DEFAULT FAT PORTIONS
======================================== */

function getDefaultFatAmount(
  food
) {
  if (!food) {
    return 0;
  }

  /*
    Olive oil:
    1 serving = 10 g
  */

  if (
    food.id ===
    "olive_oil"
  ) {
    return 1;
  }

  /*
    Avocado:
    50 g
  */

  if (
    food.id ===
    "avocado"
  ) {
    return 50;
  }

  /*
    Almonds:
    database unit is 28 g.

    0.5 = 14 g.
  */

  if (
    food.id ===
    "almonds"
  ) {
    return 0.5;
  }

  /*
    Nuts, seeds and spreads:
    practical 15 g portion.
  */

  if (
    food.unit.kind ===
    "per100g"
  ) {
    return 15;
  }

  if (
    food.unit.kind ===
    "perUnit"
  ) {
    return 1;
  }

  if (
    food.unit.kind ===
    "per10g"
  ) {
    return 1;
  }

  return 0;
}

/* ========================================
   CREATE MEAL ITEM
======================================== */

function createMealItem(
  food,
  amount,
  scaled
) {
  return {
    id: food.id,

    displayName:
      getCleanFoodName(
        food.name
      ),

    preparationLabel:
      getPreparationLabel(
        food
      ),

    amount,

    unitKind:
      food.unit.kind,

    unitGrams:
      food.unit.grams || null,

    displayAmount:
      formatFoodAmount(
        food,
        amount
      ),

    scaled,
  };
}

/* ========================================
   CLEAN FOOD NAMES
======================================== */

function getCleanFoodName(
  name
) {
  if (!name) {
    return "";
  }

  return name
    .replace(
      /\s*\(raw\)\s*/gi,
      ""
    )
    .replace(
      /\s*\(canned,\s*drained\)\s*/gi,
      ""
    )
    .replace(
      /\s*\(plain\)\s*/gi,
      ""
    )
    .trim();
}

/* ========================================
   PREPARATION LABEL
======================================== */

function getPreparationLabel(
  food
) {
  if (!food) {
    return "";
  }

  if (
    (food.tags || []).includes(
      "raw"
    )
  ) {
    if (
      food.id ===
      "rolled_oats_dry"
    ) {
      return "dry weight";
    }

    return "raw weight";
  }

  if (
    (food.tags || []).includes(
      "dry"
    )
  ) {
    return "dry weight";
  }

  if (
    food.id ===
    "tuna_canned_drained"
  ) {
    return "drained weight";
  }

  if (
    food.id ===
    "whey_protein"
  ) {
    return "powder";
  }

  if (
    food.id ===
      "milk_skimmed" ||
    food.id ===
      "almond_milk_unsweet"
  ) {
    return "as served";
  }

  if (
    food.unit.kind ===
    "perUnit"
  ) {
    return "whole units";
  }

  if (
    (food.tags || []).includes(
      "ready_to_eat"
    )
  ) {
    return "as eaten";
  }

  return "as served";
}

/* ========================================
   DISPLAY PORTION
======================================== */

function formatFoodAmount(
  food,
  amount
) {
  if (
    food.unit.kind ===
    "per100g"
  ) {
    return `~${Math.round(
      amount
    )} g`;
  }

  if (
    food.unit.kind ===
    "perUnit"
  ) {
    if (
      food.id ===
      "whey_protein"
    ) {
      const grams =
        amount *
        food.unit.grams;

      return `~${roundToNearest(
        grams,
        5
      )} g (${formatNumber(
        amount
      )} ${
        amount === 1
          ? "scoop"
          : "scoops"
      })`;
    }

    if (
      food.id ===
      "egg_whole"
    ) {
      return `${formatNumber(
        amount
      )} ${
        amount === 1
          ? "egg"
          : "eggs"
      }`;
    }

    return `${formatNumber(
      amount
    )} ${
      amount === 1
        ? "unit"
        : "units"
    }`;
  }

  if (
    food.unit.kind ===
    "per10g"
  ) {
    const grams =
      amount *
      food.unit.grams;

    return `~${Math.round(
      grams
    )} g`;
  }

  return String(amount);
}

/* ========================================
   MEAL PREP DISPLAY
======================================== */

function formatPrepAmount(
  item,
  mealCount
) {
  if (
    item.unitKind ===
    "per100g"
  ) {
    const totalGrams =
      item.amount *
      mealCount;

    return `${Math.round(
      totalGrams
    )} g`;
  }

  if (
    item.unitKind ===
    "perUnit"
  ) {
    if (
      item.id ===
      "whey_protein"
    ) {
      const grams =
        item.amount *
        item.unitGrams *
        mealCount;

      return `~${Math.round(
        grams
      )} g powder`;
    }

    const units =
      item.amount *
      mealCount;

    if (
      item.id ===
      "egg_whole"
    ) {
      return `${formatNumber(
        units
      )} ${
        units === 1
          ? "egg"
          : "eggs"
      }`;
    }

    return `${formatNumber(
      units
    )} ${
      units === 1
        ? "unit"
        : "units"
    }`;
  }

  if (
    item.unitKind ===
    "per10g"
  ) {
    const grams =
      item.amount *
      item.unitGrams *
      mealCount;

    return `${Math.round(
      grams
    )} g`;
  }

  return "";
}

/* ========================================
   NUTRITION HELPERS
======================================== */

function safeScaleFood(
  food,
  amount
) {
  if (
    !food ||
    !food.unit ||
    amount <= 0
  ) {
    return empty();
  }

  return scaleFood(
    food,
    amount
  );
}

function empty() {
  return {
    kcal: 0,
    p: 0,
    c: 0,
    f: 0,
    fiber: 0,
    grams: 0,
  };
}

function roundToNearest(
  value,
  step
) {
  if (
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return (
    Math.round(
      value / step
    ) * step
  );
}

function formatNumber(
  value
) {
  return Number.isInteger(
    value
  )
    ? String(value)
    : value.toFixed(1);
}

function clamp(
  value,
  min,
  max
) {
  if (
    !Number.isFinite(value)
  ) {
    return min;
  }

  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );
}