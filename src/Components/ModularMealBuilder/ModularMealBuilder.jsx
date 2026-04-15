import { useMemo, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import styles from "./ModularMealBuilder.module.css";
import { FOODS_BY_GROUP, FOOD_BY_ID } from "../../data/foods";
import {
  scaleFood,
  sumItems,
  gramsToCloseKcalGap,
  oilVolumeFromGrams,
} from "../../utils/nutrition";

export default function ModularMealBuilder({
  defaultTargets = { kcal: 550, proteinMin: 35, proteinMax: 50 },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    "Protein",
    "Fruits & Vegetables",
    "Carbohydrate",
    "Fat",
    "Cooking Oil",
    "Summary",
  ];
  const [step, setStep] = useState(0);

  const [useTargets, setUseTargets] = useState(false);
  const [targetKcal, setTargetKcal] = useState(defaultTargets.kcal);
  const [proteinMin, setProteinMin] = useState(defaultTargets.proteinMin);
  const [proteinMax, setProteinMax] = useState(defaultTargets.proteinMax);

  const [proteins, setProteins] = useState([{ id: "", amount: "" }]);

  const [vegId, setVegId] = useState("");
  const [vegAmount, setVegAmount] = useState("");
  const [fruitId, setFruitId] = useState("");
  const [fruitAmount, setFruitAmount] = useState("");

  const [carbId, setCarbId] = useState("");
  const [carbAmount, setCarbAmount] = useState("");

  const [fatId, setFatId] = useState("");
  const [fatAmount, setFatAmount] = useState("");

  const [usedOil, setUsedOil] = useState(false);
  const [oilId, setOilId] = useState("olive_oil");
  const [oilGrams, setOilGrams] = useState("");

  const [mealCountStr, setMealCountStr] = useState("1");
  const mealCount = Math.max(1, parseInt(mealCountStr || "1", 10));

  const fruitOptions = useMemo(
    () => FOODS_BY_GROUP.carb.filter((f) => (f.tags || []).includes("fruit")),
    []
  );

  const carbOnlyOptions = useMemo(
    () => FOODS_BY_GROUP.carb.filter((f) => !(f.tags || []).includes("fruit")),
    []
  );

  const calc = useMemo(() => {
    const proteinScaledItems = proteins.map((row) => {
      if (!row.id || toNum(row.amount) <= 0) return empty();

      const food = FOOD_BY_ID[row.id];
      if (!food) return empty();

      return safeScaleFood(food, toNum(row.amount));
    });

    const pSum = sumItems(proteinScaledItems);

    const vFood = vegId && FOOD_BY_ID[vegId] ? FOOD_BY_ID[vegId] : null;
    const fruitFood =
      fruitId && FOOD_BY_ID[fruitId] ? FOOD_BY_ID[fruitId] : null;
    const cFood = carbId && FOOD_BY_ID[carbId] ? FOOD_BY_ID[carbId] : null;
    const fFood = fatId && FOOD_BY_ID[fatId] ? FOOD_BY_ID[fatId] : null;
    const oilFood = oilId && FOOD_BY_ID[oilId] ? FOOD_BY_ID[oilId] : null;

    const v =
      vFood && toNum(vegAmount) > 0
        ? safeScaleFood(vFood, toNum(vegAmount))
        : empty();

    const fruit =
      fruitFood && toNum(fruitAmount) > 0
        ? safeScaleFood(fruitFood, toNum(fruitAmount))
        : empty();

    const c =
      cFood && toNum(carbAmount) > 0
        ? safeScaleFood(cFood, toNum(carbAmount))
        : empty();

    const f =
      fFood && toNum(fatAmount) > 0
        ? safeScaleFood(fFood, toNum(fatAmount))
        : empty();

    let oil = empty();
    if (usedOil && oilFood && toNum(oilGrams) > 0) {
      oil = safeScaleFood(oilFood, toNum(oilGrams));
    }

    const total = sumItems([pSum, v, fruit, c, f, oil]);

    let suggestion = null;
    const somethingChosen =
      proteinScaledItems.some((x) => x.kcal > 0) ||
      v.kcal > 0 ||
      fruit.kcal > 0 ||
      c.kcal > 0 ||
      f.kcal > 0 ||
      oil.kcal > 0;

    if (useTargets && somethingChosen) {
      const kcalGap = targetKcal - total.kcal;

      if (
        Math.abs(kcalGap) <= 30 &&
        total.p >= proteinMin &&
        total.p <= proteinMax
      ) {
        suggestion =
          "Perfect! You’re right on target for calories and protein.";
      } else {
        if (kcalGap > 0) {
          const adjFood =
            cFood ||
            fFood ||
            oilFood ||
            fruitFood ||
            vFood ||
            firstProteinFood(proteins);

          if (adjFood) {
            const addAmount = gramsToCloseKcalGap(adjFood, kcalGap);
            suggestion = `Add ~${roundTo(
              addAmount,
              adjFood.unit.kind === "per100g" ? 5 : 1
            )}${adjFood.unit.kind === "perUnit" ? " units" : "g"} ${adjFood.name.toLowerCase()} to move closer to ~${targetKcal} kcal.`;
          }
        } else if (kcalGap < 0) {
          const overBy = Math.abs(kcalGap);
          const adjFood = oilFood || fFood || cFood || fruitFood;

          if (adjFood) {
            const reduceAmount = gramsToCloseKcalGap(adjFood, overBy);
            suggestion = `Reduce ${adjFood.name.toLowerCase()} by ~${roundTo(
              reduceAmount,
              adjFood.unit.kind === "per100g" ? 5 : 1
            )}${adjFood.unit.kind === "perUnit" ? " units" : "g"}.`;
          }
        }

        if (total.p < proteinMin) {
          suggestion =
            (suggestion ? suggestion + " " : "") +
            `Tip: increase protein to at least ${proteinMin}g.`;
        } else if (total.p > proteinMax) {
          suggestion =
            (suggestion ? suggestion + " " : "") +
            `Tip: slightly reduce protein to ${proteinMax}g or below if needed.`;
        }
      }
    }

    const raw = {
      protein: Math.round(pSum.grams),
      veg: Math.round(v.grams),
      fruit: Math.round(fruit.grams),
      carb: Math.round(c.grams),
      fat: Math.round(f.grams),
      oil: usedOil ? Math.round(oil.grams) : 0,
    };

    const list = {
      protein: raw.protein * mealCount,
      veg: raw.veg * mealCount,
      fruit: raw.fruit * mealCount,
      carb: raw.carb * mealCount,
      fat: raw.fat * mealCount,
      oil: raw.oil * mealCount,
    };

    const oilVol = usedOil && list.oil > 0 ? oilVolumeFromGrams(list.oil) : null;

    const proteinNames = proteins
      .map((r) => (r.id && FOOD_BY_ID[r.id] ? FOOD_BY_ID[r.id].name : ""))
      .filter(Boolean);

    return {
      total,
      suggestion,
      raw,
      list,
      oilVol,
      names: {
        proteinNames,
        vFood,
        fruitFood,
        cFood,
        fFood,
      },
    };
  }, [
    proteins,
    vegId,
    vegAmount,
    fruitId,
    fruitAmount,
    carbId,
    carbAmount,
    fatId,
    fatAmount,
    usedOil,
    oilId,
    oilGrams,
    mealCount,
    useTargets,
    targetKcal,
    proteinMin,
    proteinMax,
  ]);

  const macroBar = useMemo(() => {
    const proteinKcal = calc.total.p * 4;
    const carbKcal = calc.total.c * 4;
    const fatKcal = calc.total.f * 9;

    const totalMacroKcal = proteinKcal + carbKcal + fatKcal;

    if (totalMacroKcal <= 0) {
      return {
        proteinPct: 0,
        carbPct: 0,
        fatPct: 0,
        hasData: false,
      };
    }

    return {
      proteinPct: (proteinKcal / totalMacroKcal) * 100,
      carbPct: (carbKcal / totalMacroKcal) * 100,
      fatPct: (fatKcal / totalMacroKcal) * 100,
      hasData: true,
    };
  }, [calc.total.p, calc.total.c, calc.total.f]);

  function canNext() {
    return true;
  }

  function handleReset() {
    setStep(0);
    setProteins([{ id: "", amount: "" }]);
    setVegId("");
    setVegAmount("");
    setFruitId("");
    setFruitAmount("");
    setCarbId("");
    setCarbAmount("");
    setFatId("");
    setFatAmount("");
    setUsedOil(false);
    setOilId("olive_oil");
    setOilGrams("");
    setMealCountStr("1");
    setUseTargets(false);
    setTargetKcal(defaultTargets.kcal);
    setProteinMin(defaultTargets.proteinMin);
    setProteinMax(defaultTargets.proteinMax);
  }

  function clearStep(stepIndex) {
    if (stepIndex === 0) {
      setProteins([{ id: "", amount: "" }]);
    }
    if (stepIndex === 1) {
      setVegId("");
      setVegAmount("");
      setFruitId("");
      setFruitAmount("");
    }
    if (stepIndex === 2) {
      setCarbId("");
      setCarbAmount("");
    }
    if (stepIndex === 3) {
      setFatId("");
      setFatAmount("");
    }
    if (stepIndex === 4) {
      setUsedOil(false);
      setOilId("olive_oil");
      setOilGrams("");
    }
  }

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button
          className={`${styles.openBtn} ${styles.green}`}
          onClick={() => setIsOpen(true)}
        >
          <FaUtensils className={styles.icon} />
          <span>Meal Builder</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.calculatorCard}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            ✕
          </button>

          <h2 className={styles.title}>Meal Builder</h2>
          <p className={styles.subtitle}>
            Build your meal your way. Add what you want, skip what you don’t.
            All weights are raw unless stated otherwise.
          </p>

          <div className={styles.macroBarCard}>
            <div className={styles.builderTools}>
              <label className={styles.targetsToggle}>
                <input
                  type="checkbox"
                  checked={useTargets}
                  onChange={(e) => setUseTargets(e.target.checked)}
                />
                <span>Targets</span>
              </label>

              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <div className={styles.macroBarHeader}>
              <h3 className={styles.macroBarTitle}>Meal Breakdown</h3>

              <div className={styles.macroTotals}>
                <span>{calc.total.kcal} kcal</span>
                <span>P {calc.total.p}g</span>
                <span>C {calc.total.c}g</span>
                <span>F {calc.total.f}g</span>
                <span>Fibre {calc.total.fiber}g</span>
              </div>
            </div>

            {macroBar.hasData ? (
              <>
                <div className={styles.macroBarTrack}>
                  <div
                    className={styles.macroProtein}
                    style={{ width: `${macroBar.proteinPct}%` }}
                  />
                  <div
                    className={styles.macroCarb}
                    style={{ width: `${macroBar.carbPct}%` }}
                  />
                  <div
                    className={styles.macroFat}
                    style={{ width: `${macroBar.fatPct}%` }}
                  />
                </div>

                <div className={styles.macroLegend}>
                  <span>
                    <i className={`${styles.legendDot} ${styles.proteinDot}`} />
                    Protein {Math.round(macroBar.proteinPct)}%
                  </span>
                  <span>
                    <i className={`${styles.legendDot} ${styles.carbDot}`} />
                    Carbs {Math.round(macroBar.carbPct)}%
                  </span>
                  <span>
                    <i className={`${styles.legendDot} ${styles.fatDot}`} />
                    Fat {Math.round(macroBar.fatPct)}%
                  </span>
                </div>
              </>
            ) : (
              <p className={styles.macroEmpty}>
                Add foods to see your meal breakdown.
              </p>
            )}
          </div>

          {useTargets && (
            <div className={styles.section}>
              <h3 className={styles.h3}>Targets</h3>
              <div className={styles.formRow}>
                <NumberField
                  label="Target kcal"
                  value={String(targetKcal)}
                  onChange={(v) => setTargetKcal(toNum(v))}
                />
                <NumberField
                  label="Protein min"
                  value={String(proteinMin)}
                  onChange={(v) => setProteinMin(toNum(v))}
                />
                <NumberField
                  label="Protein max"
                  value={String(proteinMax)}
                  onChange={(v) => setProteinMax(toNum(v))}
                />
              </div>
            </div>
          )}

          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className={styles.stepLabel}>
              {step + 1} / {steps.length} — {steps[step]}
            </div>
          </div>

          {step === 0 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 1: Protein</h3>
              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                Add one protein, multiple proteins, or skip this step.
              </p>

              {proteins.map((row, idx) => (
                <div key={idx} className={styles.formRow}>
                  <SelectField
                    label={`Protein ${
                      proteins.length > 1 ? idx + 1 : ""
                    }`.trim()}
                    value={row.id}
                    onChange={(val) => updateProtein(idx, { id: val })}
                    options={FOODS_BY_GROUP.protein}
                    placeholder="Choose protein…"
                  />

                  <AmountField
                    label={usesUnits(row.id) ? "Amount (units)" : "Amount (g)"}
                    value={row.amount}
                    onChange={(val) => updateProtein(idx, { amount: val })}
                    step={usesUnits(row.id) ? 1 : 10}
                    placeholder={usesUnits(row.id) ? "1" : "150"}
                  />

                  {proteins.length > 1 && (
                    <div className={styles.formGroup}>
                      <span style={{ visibility: "hidden" }}>spacer</span>
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={() => removeProtein(idx)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={addProtein}
                  >
                    + Add Protein
                  </button>
                </div>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 2: Fruits & Vegetables</h3>

              <div className={styles.formRow}>
                <SelectField
                  label="Vegetable"
                  value={vegId}
                  onChange={setVegId}
                  options={FOODS_BY_GROUP.veg}
                  placeholder="Choose vegetable…"
                />
                <AmountField
                  label="Veg amount (g)"
                  value={vegAmount}
                  onChange={setVegAmount}
                  step={25}
                  placeholder="150"
                />
              </div>

              <div className={styles.formRow}>
                <SelectField
                  label="Fruit"
                  value={fruitId}
                  onChange={setFruitId}
                  options={fruitOptions}
                  placeholder="Choose fruit…"
                />
                <AmountField
                  label="Fruit amount (g)"
                  value={fruitAmount}
                  onChange={setFruitAmount}
                  step={25}
                  placeholder="100"
                />
              </div>

              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                Add vegetables, fruit, both, or skip this step.
              </p>
            </section>
          )}

          {step === 2 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 3: Carbohydrate</h3>
              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                Add a carbohydrate source or skip this step.
              </p>

              <div className={styles.formRow}>
                <SelectField
                  label="Carb"
                  value={carbId}
                  onChange={setCarbId}
                  options={carbOnlyOptions}
                  placeholder="Choose carbohydrate…"
                />
                <AmountField
                  label={usesUnits(carbId) ? "Amount (units)" : "Amount (g)"}
                  value={carbAmount}
                  onChange={setCarbAmount}
                  step={usesUnits(carbId) ? 1 : 10}
                  placeholder={usesUnits(carbId) ? "1" : "75"}
                />
              </div>
            </section>
          )}

          {step === 3 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 4: Fat</h3>
              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                Add a fat source or skip this step.
              </p>

              <div className={styles.formRow}>
                <SelectField
                  label="Fat"
                  value={fatId}
                  onChange={setFatId}
                  options={FOODS_BY_GROUP.fat.filter((f) => f.id !== "olive_oil")}
                  placeholder="Choose fat…"
                />
                <AmountField
                  label={usesUnits(fatId) ? "Amount (units)" : "Amount (g)"}
                  value={fatAmount}
                  onChange={setFatAmount}
                  step={usesUnits(fatId) ? 1 : 2}
                  placeholder={usesUnits(fatId) ? "1" : "20"}
                />
              </div>
            </section>
          )}

          {step === 4 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 5: Cooking Oil</h3>
              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                Add oil if used for cooking, or skip this step.
              </p>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Used oil?</label>
                  <select
                    className={styles.select}
                    value={usedOil ? "yes" : "no"}
                    onChange={(e) => setUsedOil(e.target.value === "yes")}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {usedOil && (
                  <>
                    <div className={styles.formGroup}>
                      <label>Oil type</label>
                      <select
                        className={styles.select}
                        value={oilId}
                        onChange={(e) => setOilId(e.target.value)}
                      >
                        <option value="olive_oil">Olive oil</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Oil (grams)</label>
                      <input
                        className={styles.input}
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step={2}
                        value={oilGrams}
                        placeholder="10"
                        onChange={(e) => setOilGrams(e.target.value)}
                        onBlur={(e) =>
                          setOilGrams(
                            e.target.value === ""
                              ? ""
                              : String(toNum(e.target.value))
                          )
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {step === 5 && (
            <>
              <section className={styles.section}>
                <h3 className={styles.h3}>Step 6: Summary</h3>
                <div className={styles.grid}>
                  <Stat label="Calories" value={`${calc.total.kcal} kcal`} />
                  <Stat label="Protein" value={`${calc.total.p} g`} />
                  <Stat label="Carbs" value={`${calc.total.c} g`} />
                  <Stat label="Fat" value={`${calc.total.f} g`} />
                  <Stat label="Fiber" value={`${calc.total.fiber} g`} />
                  <Stat label="Total Weight" value={`${calc.total.grams} g`} />
                </div>

                {useTargets && calc.suggestion && (
                  <p className={styles.suggestion}>{calc.suggestion}</p>
                )}
              </section>

              <section className={styles.section}>
                <h3 className={styles.h3}>Grocery Estimate</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>How many meals like this?</label>
                    <input
                      className={styles.input}
                      type="number"
                      inputMode="numeric"
                      min="1"
                      step="1"
                      value={mealCountStr}
                      onChange={(e) => {
                        const v = e.target.value.replace(/[^\d]/g, "");
                        setMealCountStr(v);
                      }}
                      onBlur={(e) => {
                        const n = Math.max(
                          1,
                          parseInt(e.target.value || "1", 10)
                        );
                        setMealCountStr(String(n));
                      }}
                    />
                  </div>
                </div>

                <table className={styles.table} style={{ marginTop: ".5rem" }}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Raw for 1 meal</th>
                      <th>Raw × {mealCount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calc.raw.protein > 0 && (
                      <GroceryRow
                        label={`Protein (${
                          calc.names.proteinNames.length
                            ? calc.names.proteinNames.join(", ")
                            : "—"
                        })`}
                        one={calc.raw.protein}
                        many={calc.list.protein}
                      />
                    )}

                    {calc.raw.veg > 0 && (
                      <GroceryRow
                        label={`Vegetable (${calc.names.vFood?.name ?? "—"})`}
                        one={calc.raw.veg}
                        many={calc.list.veg}
                      />
                    )}

                    {calc.raw.fruit > 0 && (
                      <GroceryRow
                        label={`Fruit (${calc.names.fruitFood?.name ?? "—"})`}
                        one={calc.raw.fruit}
                        many={calc.list.fruit}
                      />
                    )}

                    {calc.raw.carb > 0 && (
                      <GroceryRow
                        label={`Carb (${calc.names.cFood?.name ?? "—"})`}
                        one={calc.raw.carb}
                        many={calc.list.carb}
                      />
                    )}

                    {calc.raw.fat > 0 && (
                      <GroceryRow
                        label={`Fat (${calc.names.fFood?.name ?? "—"})`}
                        one={calc.raw.fat}
                        many={calc.list.fat}
                      />
                    )}

                    {calc.raw.oil > 0 && (
                      <tr>
                        <td>Cooking oil</td>
                        <td>{calc.raw.oil} g</td>
                        <td>
                          {calc.list.oil} g
                          {calc.oilVol && (
                            <>
                              {" "}
                              · ~{calc.oilVol.ml} ml (≈ {calc.oilVol.tbsp} tbsp)
                            </>
                          )}
                        </td>
                      </tr>
                    )}

                    {calc.raw.protein === 0 &&
                      calc.raw.veg === 0 &&
                      calc.raw.fruit === 0 &&
                      calc.raw.carb === 0 &&
                      calc.raw.fat === 0 &&
                      calc.raw.oil === 0 && (
                        <tr>
                          <td colSpan="3">No foods added yet.</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </section>
            </>
          )}

          <div className={styles.stepNav}>
            <button
              className={styles.secondaryBtn}
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    clearStep(step);
                    setStep((s) => Math.min(steps.length - 1, s + 1));
                  }}
                >
                  Skip
                </button>

                <button
                  className={styles.primaryBtn}
                  disabled={!canNext()}
                  onClick={() =>
                    setStep((s) => Math.min(steps.length - 1, s + 1))
                  }
                >
                  Next
                </button>
              </>
            ) : (
              <button
                className={styles.primaryBtn}
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  function addProtein() {
    setProteins((rows) => [...rows, { id: "", amount: "" }]);
  }

  function updateProtein(index, patch) {
    setProteins((rows) =>
      rows.map((r, i) => (i === index ? { ...r, ...patch } : r))
    );
  }

  function removeProtein(index) {
    setProteins((rows) => rows.filter((_, i) => i !== index));
  }
}

function AmountField({
  label,
  value,
  onChange,
  step = 10,
  placeholder = "150",
}) {
  return (
    <label className={styles.formGroup}>
      <span>{label}</span>
      <input
        className={styles.input}
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) =>
          onChange(e.target.value === "" ? "" : String(toNum(e.target.value)))
        }
      />
    </label>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <label className={styles.formGroup}>
      <span>{label}</span>
      <input
        className={styles.input}
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Choose…",
}) {
  return (
    <label className={styles.formGroup}>
      <span>{label}</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name} — {o.perLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}

function GroceryRow({ label, one, many }) {
  return (
    <tr>
      <td>{label}</td>
      <td>{one} g</td>
      <td>{many} g</td>
    </tr>
  );
}

function usesUnits(foodId) {
  if (!foodId) return false;
  const food = FOOD_BY_ID[foodId];
  return food?.unit?.kind === "perUnit";
}

function firstProteinFood(proteins) {
  const first = proteins.find((r) => r.id && FOOD_BY_ID[r.id]);
  return first ? FOOD_BY_ID[first.id] : null;
}

function safeScaleFood(food, amount) {
  if (!food || !food.unit || amount <= 0) return empty();
  return scaleFood(food, amount);
}

function empty() {
  return { kcal: 0, p: 0, c: 0, f: 0, fiber: 0, grams: 0 };
}

function roundTo(n, step) {
  if (!n || !step) return 0;
  return Math.round(n / step) * step;
}

function toNum(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}