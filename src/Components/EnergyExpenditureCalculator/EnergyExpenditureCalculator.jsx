import { useState } from "react";
import { FaDrumstickBite } from "react-icons/fa";
import styles from "./EnergyExpenditureCalculator.module.css";

const proteinSources = [
  {
    name: "Chicken Breast",
    proteinPer100g: 23,
    type: "weight",
    unit: "raw",
  },
  {
    name: "Lean Beef Mince",
    proteinPer100g: 21,
    type: "weight",
    unit: "raw",
  },
  {
    name: "Lean Steak",
    proteinPer100g: 22,
    type: "weight",
    unit: "raw",
  },
  {
    name: "Salmon",
    proteinPer100g: 20,
    type: "weight",
    unit: "raw",
  },
  {
    name: "White Fish",
    proteinPer100g: 20,
    type: "weight",
    unit: "raw",
  },
  {
    name: "Prawns",
    proteinPer100g: 20,
    type: "weight",
    unit: "raw",
  },
  {
    name: "Tuna",
    proteinPer100g: 24,
    type: "weight",
    unit: "drained",
  },
  {
    name: "Greek Yogurt",
    proteinPer100g: 10,
    type: "weight",
    unit: "",
  },
  {
    name: "Cottage Cheese",
    proteinPer100g: 12,
    type: "weight",
    unit: "",
  },
  {
    name: "Tofu",
    proteinPer100g: 15,
    type: "weight",
    unit: "",
  },
  {
    name: "Whey Protein",
    proteinPerServing: 24,
    servingSize: 30,
    type: "whey",
  },
  {
    name: "Eggs + Egg Whites",
    type: "eggs",
  },
];

export default function EnergyExpenditureCalculator() {
  const [isOpen, setIsOpen] = useState(false);

  const [weight, setWeight] = useState("");
  const [proteinFactor, setProteinFactor] = useState(1.6);
  const [meals, setMeals] = useState(4);

  const weightNumber = parseFloat(weight);

  const hasValidWeight =
    Number.isFinite(weightNumber) && weightNumber > 0;

  const dailyProtein = hasValidWeight
    ? Math.round(weightNumber * proteinFactor)
    : null;

  const proteinPerMeal =
    dailyProtein && meals
      ? Math.round(dailyProtein / meals)
      : null;

  const roundToNearest5 = (value) => {
    return Math.round(value / 5) * 5;
  };

  const getFoodServing = (food) => {
    if (!proteinPerMeal) return null;

    /*
      Foods normally weighed in grams.
      Portion is rounded to the nearest 5 g
      to keep the recommendation practical.
    */
    if (food.type === "weight") {
      const exactGrams =
        (proteinPerMeal / food.proteinPer100g) * 100;

      const grams = roundToNearest5(exactGrams);

      return {
        amount: `~${grams} g`,
        unit: food.unit,
      };
    }

    /*
      Whey:
      Approximate example based on
      24 g protein per 30 g powder.
    */
    if (food.type === "whey") {
      const exactPowder =
        (proteinPerMeal / food.proteinPerServing) *
        food.servingSize;

      const powderGrams = roundToNearest5(exactPowder);

      const scoops =
        proteinPerMeal / food.proteinPerServing;

      return {
        amount: `~${powderGrams} g`,
        unit: `powder • ~${scoops.toFixed(1)} scoops`,
      };
    }

    /*
      Eggs + egg whites:
      Use two whole eggs first, then calculate
      enough egg whites to approximately reach
      the remaining protein target.

      Approximate values:
      1 large egg = 6 g protein
      100 g egg whites = 11 g protein
    */
    if (food.type === "eggs") {
      const proteinPerEgg = 6;
      const eggWhiteProteinPer100g = 11;

      /*
        For very small targets, simply use
        enough whole eggs rather than adding
        egg whites unnecessarily.
      */
      if (proteinPerMeal <= 18) {
        const eggs = Math.max(
          1,
          Math.round(proteinPerMeal / proteinPerEgg)
        );

        return {
          amount: `~${eggs} whole ${eggs === 1 ? "egg" : "eggs"}`,
          unit: "",
        };
      }

      const wholeEggs = 2;
      const proteinFromEggs =
        wholeEggs * proteinPerEgg;

      const remainingProtein = Math.max(
        proteinPerMeal - proteinFromEggs,
        0
      );

      const exactEggWhites =
        (remainingProtein /
          eggWhiteProteinPer100g) *
        100;

      const eggWhiteGrams =
        roundToNearest5(exactEggWhites);

      return {
        amount: `${wholeEggs} eggs + ~${eggWhiteGrams} g`,
        unit: "egg whites",
      };
    }

    return null;
  };

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button
          type="button"
          className={styles.openBtn}
          onClick={() => setIsOpen(true)}
        >
          <FaDrumstickBite className={styles.icon} />

          <span>Protein Calculator</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.calculatorCard}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close protein calculator"
          >
            ✕
          </button>

          <span className={styles.eyebrow}>
            NUTRITION TOOL
          </span>

          <h2 className={styles.title}>
            Protein Calculator
          </h2>

          <p className={styles.intro}>
            Calculate your daily protein target, divide it
            across your meals and see practical examples of
            foods that can help you reach it.
          </p>

          {/* BODY WEIGHT */}

          <div className={styles.formGroup}>
            <label htmlFor="protein-weight">
              Body weight
            </label>

            <div className={styles.inputWithUnit}>
              <input
                id="protein-weight"
                type="number"
                min="1"
                max="300"
                step="0.1"
                inputMode="decimal"
                placeholder="e.g. 80"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value)
                }
              />

              <span>kg</span>
            </div>
          </div>

          {/* PROTEIN TARGET */}

          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <label htmlFor="protein-factor">
                Daily protein target
              </label>

              <span>
                {proteinFactor.toFixed(1)} g/kg
              </span>
            </div>

            <input
              id="protein-factor"
              type="range"
              min="1.2"
              max="2.2"
              step="0.1"
              value={proteinFactor}
              onChange={(e) =>
                setProteinFactor(
                  parseFloat(e.target.value)
                )
              }
              className={styles.slider}
            />

            <div className={styles.sliderScale}>
              <span>1.2 g/kg</span>
              <span>2.2 g/kg</span>
            </div>
          </div>

          {/* MEALS PER DAY */}

          <div className={styles.formGroup}>
            <label htmlFor="protein-meals">
              Meals per day
            </label>

            <select
              id="protein-meals"
              value={meals}
              onChange={(e) =>
                setMeals(Number(e.target.value))
              }
            >
              <option value={2}>2 meals</option>
              <option value={3}>3 meals</option>
              <option value={4}>4 meals</option>
              <option value={5}>5 meals</option>
              <option value={6}>6 meals</option>
            </select>
          </div>

          {/* RESULTS */}

          {dailyProtein && proteinPerMeal && (
            <>
              <div className={styles.results}>
                <span className={styles.resultsLabel}>
                  YOUR PROTEIN TARGET
                </span>

                <div className={styles.resultsGrid}>
                  <div className={styles.resultItem}>
                    <span>Daily protein</span>

                    <div>
                      <strong>
                        {dailyProtein}
                      </strong>

                      <small>g/day</small>
                    </div>
                  </div>

                  <div className={styles.resultItem}>
                    <span>
                      Across {meals} meals
                    </span>

                    <div>
                      <strong>
                        {proteinPerMeal}
                      </strong>

                      <small>g/meal</small>
                    </div>
                  </div>
                </div>

                <p className={styles.resultNote}>
                  You don't need to hit exactly{" "}
                  {proteinPerMeal} g at every meal. Think of
                  this as a simple way to spread your protein
                  intake across the day.
                </p>
              </div>

              {/* PROTEIN SOURCES */}

              <div className={styles.foodSection}>
                <div className={styles.foodHeading}>
                  <span>
                    PROTEIN SOURCES
                  </span>

                  <h3>
                    What does about {proteinPerMeal} g of
                    protein look like?
                  </h3>

                  <p>
                    Choose one of the options below as a
                    practical starting point for a meal.
                  </p>

                  <p className={styles.rawNote}>
                    Meat and fish portions are shown as raw
                    weights unless otherwise stated.
                  </p>
                </div>

                <div className={styles.foodGrid}>
                  {proteinSources.map((food) => {
                    const serving =
                      getFoodServing(food);

                    if (!serving) return null;

                    return (
                      <div
                        key={food.name}
                        className={styles.foodCard}
                      >
                        <span
                          className={styles.foodName}
                        >
                          {food.name}
                        </span>

                        <div
                          className={
                            styles.foodServing
                          }
                        >
                          <strong>
                            {serving.amount}
                          </strong>

                          {serving.unit && (
                            <small>
                              {serving.unit}
                            </small>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className={styles.foodDisclaimer}>
                  Protein values are approximate and can
                  vary between products, brands and cuts of
                  meat. Check the nutrition label when you
                  need a more precise value.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

