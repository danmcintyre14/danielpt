import { useState } from "react";
import { FaAppleAlt } from "react-icons/fa";
import styles from "./NutritionCalculator.module.css";

const GOAL_ADJUSTMENTS = {
  fatloss: 0.85,
  maintenance: 1,
  muscle: 1.075,
};

export default function NutritionCalculator() {
  const [isOpen, setIsOpen] = useState(false);

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [activity, setActivity] = useState(1.375);
  const [goal, setGoal] = useState("maintenance");

  const [proteinFactor, setProteinFactor] = useState(1.8);

  const calculateCalories = () => {
    const ageNumber = Number(age);
    const weightNumber = Number(weight);
    const heightNumber = Number(height);

    if (
      !ageNumber ||
      !weightNumber ||
      !heightNumber
    ) {
      return null;
    }

    /*
      Mifflin-St Jeor equation
    */

    const bmr =
      gender === "male"
        ? 10 * weightNumber +
          6.25 * heightNumber -
          5 * ageNumber +
          5
        : 10 * weightNumber +
          6.25 * heightNumber -
          5 * ageNumber -
          161;

    /*
      Estimated maintenance calories
    */

    const maintenanceCalories =
      bmr * activity;

    /*
      Goal adjustment

      Fat loss:
      15% below estimated maintenance

      Maintenance:
      no adjustment

      Muscle gain:
      7.5% above estimated maintenance
    */

    const targetCalories =
      maintenanceCalories *
      GOAL_ADJUSTMENTS[goal];

    /*
      Protein

      User selects 1.6–2.2 g/kg.
    */

    const proteinGrams =
      weightNumber * proteinFactor;

    const proteinCalories =
      proteinGrams * 4;

    /*
      Fat

      Set automatically at 30%
      of target calories.
    */

    const fatCalories =
      targetCalories * 0.3;

    const fatGrams =
      fatCalories / 9;

    /*
      Carbohydrate receives the
      remaining calories.
    */

    const carbCalories = Math.max(
      targetCalories -
        proteinCalories -
        fatCalories,
      0
    );

    const carbGrams =
      carbCalories / 4;

    return {
      bmr: Math.round(bmr),

      maintenance:
        Math.round(
          maintenanceCalories
        ),

      calories:
        Math.round(
          targetCalories
        ),

      protein:
        Math.round(
          proteinGrams
        ),

      carbs:
        Math.round(
          carbGrams
        ),

      fat:
        Math.round(
          fatGrams
        ),
    };
  };

  const results =
    calculateCalories();

  const goalDescription =
    getGoalDescription(goal);

  return (
    <div className={styles.container}>
      {/* =====================
          CLOSED CARD
      ===================== */}

      {!isOpen && (
        <button
          type="button"
          className={styles.openBtn}
          onClick={() =>
            setIsOpen(true)
          }
        >
          <FaAppleAlt
            className={styles.icon}
          />

          <span>
            Calorie & Macro Calculator
          </span>
        </button>
      )}

      {/* =====================
          OPEN CALCULATOR
      ===================== */}

      {isOpen && (
        <div
          className={
            styles.calculatorCard
          }
        >
          <button
            type="button"
            className={
              styles.closeBtn
            }
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Close calculator"
          >
            ✕
          </button>

          <span
            className={
              styles.eyebrow
            }
          >
            NUTRITION TOOL
          </span>

          <h2
            className={styles.title}
          >
            Calorie & Macro Calculator
          </h2>

          <p
            className={styles.intro}
          >
            Estimate your daily calorie,
            protein, carbohydrate and fat
            targets.
          </p>

          {/* =====================
              01 YOUR DETAILS
          ===================== */}

          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionHeader
              }
            >
              <span>01</span>

              <div>
                <h3>
                  Your details
                </h3>

                <p>
                  Enter your basic
                  information so we can
                  estimate your energy
                  requirements.
                </p>
              </div>
            </div>

            <div
              className={
                styles.detailsGrid
              }
            >
              <div
                className={
                  styles.formGroup
                }
              >
                <label htmlFor="nutrition-gender">
                  Sex
                </label>

                <select
                  id="nutrition-gender"
                  value={gender}
                  onChange={(e) =>
                    setGender(
                      e.target.value
                    )
                  }
                >
                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>
                </select>
              </div>

              <div
                className={
                  styles.formGroup
                }
              >
                <label htmlFor="nutrition-age">
                  Age
                </label>

                <div
                  className={
                    styles.inputWithUnit
                  }
                >
                  <input
                    id="nutrition-age"
                    type="number"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) =>
                      setAge(
                        e.target.value
                      )
                    }
                  />

                  <small>
                    years
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.formGroup
                }
              >
                <label htmlFor="nutrition-weight">
                  Weight
                </label>

                <div
                  className={
                    styles.inputWithUnit
                  }
                >
                  <input
                    id="nutrition-weight"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    value={weight}
                    onChange={(e) =>
                      setWeight(
                        e.target.value
                      )
                    }
                  />

                  <small>
                    kg
                  </small>
                </div>
              </div>

              <div
                className={
                  styles.formGroup
                }
              >
                <label htmlFor="nutrition-height">
                  Height
                </label>

                <div
                  className={
                    styles.inputWithUnit
                  }
                >
                  <input
                    id="nutrition-height"
                    type="number"
                    min="120"
                    max="230"
                    value={height}
                    onChange={(e) =>
                      setHeight(
                        e.target.value
                      )
                    }
                  />

                  <small>
                    cm
                  </small>
                </div>
              </div>
            </div>
          </section>

          {/* =====================
              02 ACTIVITY
          ===================== */}

          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionHeader
              }
            >
              <span>02</span>

              <div>
                <h3>
                  Your activity
                </h3>

                <p>
                  Choose the option that
                  best reflects your usual
                  week, including your job
                  and exercise.
                </p>
              </div>
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label htmlFor="nutrition-activity">
                Activity level
              </label>

              <select
                id="nutrition-activity"
                value={activity}
                onChange={(e) =>
                  setActivity(
                    parseFloat(
                      e.target.value
                    )
                  )
                }
              >
                <option value={1.2}>
                  Mostly sedentary — desk-based,
                  little exercise
                </option>

                <option value={1.375}>
                  Lightly active — some walking
                  and 1–3 training sessions/week
                </option>

                <option value={1.55}>
                  Moderately active — regular
                  movement and 3–5 training
                  sessions/week
                </option>

                <option value={1.725}>
                  Very active — active lifestyle
                  and hard training most days
                </option>

                <option value={1.9}>
                  Extremely active — physical job
                  plus frequent hard training
                </option>
              </select>
            </div>
          </section>

          {/* =====================
              03 GOAL
          ===================== */}

          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionHeader
              }
            >
              <span>03</span>

              <div>
                <h3>
                  Your goal
                </h3>

                <p>
                  Choose what you're
                  currently trying to
                  achieve.
                </p>
              </div>
            </div>

            <div
              className={
                styles.formGroup
              }
            >
              <label htmlFor="nutrition-goal">
                Goal
              </label>

              <select
                id="nutrition-goal"
                value={goal}
                onChange={(e) =>
                  setGoal(
                    e.target.value
                  )
                }
              >
                <option value="fatloss">
                  Lose body fat
                </option>

                <option value="maintenance">
                  Maintain weight
                </option>

                <option value="muscle">
                  Build muscle
                </option>
              </select>
            </div>

            <div
              className={
                styles.goalNote
              }
            >
              <strong>
                {goalDescription.title}
              </strong>

              <p>
                {goalDescription.text}
              </p>
            </div>
          </section>

          {/* =====================
              04 PROTEIN
          ===================== */}

          <section
            className={
              styles.section
            }
          >
            <div
              className={
                styles.sectionHeader
              }
            >
              <span>04</span>

              <div>
                <h3>
                  Protein
                </h3>

                <p>
                  1.8 g per kg of body
                  weight is a good starting
                  point for most people who
                  are resistance training.
                </p>
              </div>
            </div>

            <div
              className={
                styles.sliderGroup
              }
            >
              <div
                className={
                  styles.sliderHeader
                }
              >
                <label htmlFor="nutrition-protein">
                  Protein target
                </label>

                <span>
                  {proteinFactor.toFixed(1)}
                  {" "}g/kg
                </span>
              </div>

              <input
                id="nutrition-protein"
                type="range"
                min="1.6"
                max="2.2"
                step="0.1"
                value={proteinFactor}
                onChange={(e) =>
                  setProteinFactor(
                    parseFloat(
                      e.target.value
                    )
                  )
                }
                className={
                  styles.slider
                }
              />

              <div
                className={
                  styles.sliderScale
                }
              >
                <span>
                  1.6
                </span>

                <span>
                  2.2 g/kg
                </span>
              </div>
            </div>
          </section>

          {/* =====================
              RESULTS
          ===================== */}

          {results && (
            <section
              className={
                styles.resultsSection
              }
            >
              <div
                className={
                  styles.sectionHeader
                }
              >
                <span>05</span>

                <div>
                  <h3>
                    Your estimated targets
                  </h3>

                  <p>
                    Use these numbers as a
                    starting point rather than
                    an exact prescription.
                  </p>
                </div>
              </div>

              <div
                className={
                  styles.calorieResult
                }
              >
                <span
                  className={
                    styles.resultsLabel
                  }
                >
                  DAILY CALORIE TARGET
                </span>

                <div
                  className={
                    styles.mainCalories
                  }
                >
                  <strong>
                    {results.calories}
                  </strong>

                  <span>
                    kcal
                  </span>
                </div>

                <p>
                  Estimated maintenance:{" "}
                  <strong>
                    {results.maintenance}
                    {" "}kcal/day
                  </strong>
                </p>
              </div>

              <div
                className={
                  styles.resultsGrid
                }
              >
                <ResultItem
                  label="Protein"
                  value={results.protein}
                  unit="g"
                />

                <ResultItem
                  label="Carbohydrate"
                  value={results.carbs}
                  unit="g"
                />

                <ResultItem
                  label="Fat"
                  value={results.fat}
                  unit="g"
                />
              </div>

              <div
                className={
                  styles.startingPoint
                }
              >
                <strong>
                  Treat this as your starting point
                </strong>

                <p>
                  Energy expenditure calculations
                  are estimates. Follow your target
                  consistently and track your body
                  weight over the next 2–3 weeks.
                  Adjust your calorie intake based
                  on what actually happens.
                </p>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ResultItem({
  label,
  value,
  unit,
}) {
  return (
    <div
      className={
        styles.resultItem
      }
    >
      <span>
        {label}
      </span>

      <div>
        <strong>
          {value}
        </strong>

        <small>
          {unit}
        </small>
      </div>
    </div>
  );
}

function getGoalDescription(goal) {
  if (goal === "fatloss") {
    return {
      title:
        "Approximately 15% below maintenance",
      text:
        "This creates a moderate starting calorie deficit while keeping the plan more manageable.",
    };
  }

  if (goal === "muscle") {
    return {
      title:
        "Approximately 7.5% above maintenance",
      text:
        "This provides a modest calorie surplus to support training and muscle gain.",
    };
  }

  return {
    title:
      "Estimated maintenance calories",
    text:
      "This aims to keep calorie intake around your estimated daily energy expenditure.",
  };
}

