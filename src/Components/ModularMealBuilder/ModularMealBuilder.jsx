// src/Components/ModularMealBuilder/ModularMealBuilder.jsx
import { useMemo, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import styles from "./ModularMealBuilder.module.css";
import { FOODS_BY_GROUP, FOOD_BY_ID } from "../../data/foods";
import {
  scaleFood,
  sumItems,
  gramsToCloseKcalGap,
  cookedToRaw,
  oilVolumeFromGrams,
} from "../../utils/nutrition";

export default function ModularMealBuilder({
  defaultTargets = { kcal: 550, proteinMin: 35, proteinMax: 50 },
}) {
  // Collapsible
  const [isOpen, setIsOpen] = useState(false);

  // Wizard steps
  const steps = [
    "Protein",
    "Fruits & Vegetables",
    "Carb or Fat (optional)",
    "Cooking Oil",
    "Summary",
  ];
  const [step, setStep] = useState(0);

  // Optional coaching targets
  const [useTargets, setUseTargets] = useState(false);
  const [targetKcal, setTargetKcal] = useState(defaultTargets.kcal);
  const [proteinMin, setProteinMin] = useState(defaultTargets.proteinMin);
  const [proteinMax, setProteinMax] = useState(defaultTargets.proteinMax);

  // Step 1: Proteins (dynamic rows)
  const [proteins, setProteins] = useState([{ id: "", amount: "" }]); // {id, amount}[]

  // Step 2: Fruits & Vegetables
  const [vegId, setVegId] = useState("");
  const [vegAmount, setVegAmount] = useState("");
  const [fruitId, setFruitId] = useState("");
  const [fruitAmount, setFruitAmount] = useState("");

  // Step 3: Carb or Fat (optional)
  const [path, setPath] = useState("carb");
  const [carbId, setCarbId] = useState("");
  const [carbAmount, setCarbAmount] = useState("");
  const [fatId, setFatId] = useState("");
  const [fatAmount, setFatAmount] = useState("");

  // Step 4: Oil (optional)
  const [usedOil, setUsedOil] = useState(false);
  const [oilId, setOilId] = useState("olive_oil");
  const [oilGrams, setOilGrams] = useState("");

  // Step 5: Grocery multiplier
  const [mealCountStr, setMealCountStr] = useState("1");
  const mealCount = Math.max(1, parseInt(mealCountStr || "1", 10));

  // Fruit options are tagged under carb group
  const fruitOptions = useMemo(
    () =>
      FOODS_BY_GROUP.carb.filter(
        (f) => Array.isArray(f.tags) && f.tags.includes("fruit")
      ),
    []
  );

  // --------- calculations ---------
  const calc = useMemo(() => {
    // proteins: scale each selected protein and sum
    const proteinScaledItems = proteins.map((row) => {
      if (!row.id || toNum(row.amount) <= 0) return empty();
      const food = FOOD_BY_ID[row.id];
      return scaleFood(food, toNum(row.amount));
    });

    const pSum = sumItems(proteinScaledItems);

    const vFood = vegId ? FOOD_BY_ID[vegId] : null;
    const fruitFood = fruitId ? FOOD_BY_ID[fruitId] : null;
    const cFood = carbId ? FOOD_BY_ID[carbId] : null;
    const fFood = fatId ? FOOD_BY_ID[fatId] : null;
    const oilFood = oilId ? FOOD_BY_ID[oilId] : null;

    const v = vFood ? scaleFood(vFood, toNum(vegAmount)) : empty();
    const fruit = fruitFood
      ? scaleFood(fruitFood, toNum(fruitAmount))
      : empty();
    const c =
      path === "carb"
        ? cFood
          ? scaleFood(cFood, toNum(carbAmount))
          : empty()
        : empty();
    const f =
      path === "fat"
        ? fFood
          ? scaleFood(fFood, toNum(fatAmount))
          : empty()
        : empty();

    // oil entered in grams
    let oil = empty();
    if (usedOil && oilFood) {
      const grams = toNum(oilGrams);
      if (oilFood.unit.kind === "per10g") {
        oil = scaleFood(oilFood, grams / oilFood.unit.grams);
      } else if (oilFood.unit.kind === "per100g") {
        oil = scaleFood(oilFood, grams);
      } else {
        oil = scaleFood(oilFood, grams / (oilFood.unit.grams || 1));
      }
    }

    const total = sumItems([pSum, v, fruit, c, f, oil]);

    // coaching suggestion
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
            path === "carb"
              ? cFood || fruitFood || vFood || firstProteinFood(proteins)
              : usedOil
              ? oilFood
              : fFood || firstProteinFood(proteins) || vFood || fruitFood;
          if (adjFood) {
            const addGrams = gramsToCloseKcalGap(adjFood, kcalGap);
            suggestion = `Add ~${roundTo(
              addGrams,
              path === "carb" ? 5 : 2
            )}g ${adjFood.name.toLowerCase()} to hit ~${targetKcal} kcal.`;
          }
        } else if (kcalGap < 0) {
          const overBy = Math.abs(kcalGap);
          if (usedOil && oilFood && toNum(oilGrams) > 0) {
            const reduce = gramsToCloseKcalGap(oilFood, overBy);
            suggestion = `Reduce cooking oil by ~${roundTo(reduce, 2)}g.`;
          } else {
            const adjFood = path === "carb" ? cFood || fruitFood : fFood;
            if (adjFood) {
              const reduce = gramsToCloseKcalGap(adjFood, overBy);
              suggestion = `Reduce ${adjFood.name.toLowerCase()} by ~${roundTo(
                reduce,
                path === "carb" ? 5 : 2
              )}g.`;
            }
          }
        }
        if (total.p < proteinMin) {
          suggestion =
            (suggestion ? suggestion + " " : "") +
            `Tip: increase protein to ≥${proteinMin}g.`;
        } else if (total.p > proteinMax) {
          suggestion =
            (suggestion ? suggestion + " " : "") +
            `Tip: slightly reduce protein to ≤${proteinMax}g (optional).`;
        }
      }
    }

    // grocery/raw
    // Sum raw protein across all protein rows
    const rawProtein = proteins.reduce((acc, row) => {
      if (!row.id || toNum(row.amount) <= 0) return acc;
      const food = FOOD_BY_ID[row.id];
      const scaled = scaleFood(food, toNum(row.amount));
      return acc + cookedToRaw(food.id, scaled.grams);
    }, 0);

    const raw = {
      protein: rawProtein,
      veg: vFood ? cookedToRaw(vFood.id, v.grams) : 0,
      fruit: fruitFood ? cookedToRaw(fruitFood.id, fruit.grams) : 0,
      carb: path === "carb" && cFood ? cookedToRaw(cFood.id, c.grams) : 0,
      fat: path === "fat" && fFood ? cookedToRaw(fFood.id, f.grams) : 0,
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
    const oilVol = usedOil ? oilVolumeFromGrams(list.oil) : null;

    // Protein label list (for summary table)
    const proteinNames = proteins
      .map((r) => (r.id ? FOOD_BY_ID[r.id]?.name : ""))
      .filter(Boolean);

    return {
      items: { pSum, v, fruit, c, f, oil },
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
    path,
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

  // ---------- step guards ----------
  const canNext = () => {
    if (step === 0) {
      // need at least one valid protein row
      return proteins.some((r) => !!r.id && toNum(r.amount) > 0);
    }
    if (step === 1) {
      const vegOk = !!vegId && toNum(vegAmount) > 0;
      const fruitOk = !!fruitId && toNum(fruitAmount) > 0;
      return vegOk || fruitOk; // veg OR fruit
    }
    if (step === 2) {
      // Carb/Fat optional now
      return true;
    }
    if (step === 3) return usedOil ? toNum(oilGrams) >= 0 : true;
    return true;
  };

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
    setOilGrams("");
    setMealCountStr("1");
    setUseTargets(false);
    setTargetKcal(defaultTargets.kcal);
    setProteinMin(defaultTargets.proteinMin);
    setProteinMax(defaultTargets.proteinMax);
  }

  // ---------- UI ----------
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
          <p className={styles.subtitle}>Build a meal in 5 quick steps.</p>

          {/* Live stats + coaching toggle + reset */}
          <div className={styles.statsBar}>
            <div className={styles.statChip}>
              <span className={styles.chipLabel}>Calories</span>
              <div className={styles.chipValueWrap}>
                <strong
                  className={
                    useTargets && Math.abs(targetKcal - calc.total.kcal) <= 30
                      ? styles.ok
                      : ""
                  }
                >
                  {calc.total.kcal}
                </strong>
                <small className={styles.chipUnit}>
                  {useTargets ? ` / ${targetKcal} ` : ""}kcal
                </small>
              </div>
            </div>

            <div className={styles.statChip}>
              <span className={styles.chipLabel}>Protein</span>
              <div className={styles.chipValueWrap}>
                <strong
                  className={
                    useTargets &&
                    calc.total.p >= proteinMin &&
                    calc.total.p <= proteinMax
                      ? styles.ok
                      : ""
                  }
                >
                  {calc.total.p}
                </strong>
                <small className={styles.chipUnit}>
                  {useTargets ? ` / ${proteinMin}–${proteinMax} ` : ""}g
                </small>
              </div>
            </div>

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

          {/* Targets form */}
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

          {/* Progress */}
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

          {/* Step 1: Dynamic Proteins */}
          {step === 0 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 1: Choose Protein(s)</h3>

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
                      <span style={{ visibility: "hidden" }}>
                        remove label spacer
                      </span>
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

          {/* Step 2: Fruits & Vegetables */}
          {step === 1 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 2: Fruits & Vegetables</h3>

              <div className={styles.formRow}>
                <SelectField
                  label="Vegetable (optional)"
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
                  label="Fruit (optional)"
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
                Add vegetables, fruit, or both—your calories, carbs, and fiber
                update live above.
              </p>
            </section>
          )}

          {/* Step 3: Carb or Fat (optional) */}
          {step === 2 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>
                Step 3 (optional): Choose{" "}
                <span className={styles.badge}>Carb</span> or{" "}
                <span className={styles.badge}>Fat</span>
              </h3>
              <p className={styles.subtitle} style={{ marginTop: "-.25rem" }}>
                You can skip this step if you only want protein and
                fruits/vegetables.
              </p>

              <div className={styles.toggle}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    path === "carb" ? styles.active : ""
                  }`}
                  onClick={() => setPath("carb")}
                >
                  Carbohydrate
                </button>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    path === "fat" ? styles.active : ""
                  }`}
                  onClick={() => setPath("fat")}
                >
                  Fat
                </button>
              </div>

              {path === "carb" ? (
                <div className={styles.formRow}>
                  <SelectField
                    label="Carb (optional)"
                    value={carbId}
                    onChange={setCarbId}
                    options={FOODS_BY_GROUP.carb}
                    placeholder="Choose carbohydrate…"
                  />
                  <AmountField
                    label={usesUnits(carbId) ? "Amount (units)" : "Amount (g)"}
                    value={carbAmount}
                    onChange={setCarbAmount}
                    step={usesUnits(carbId) ? 1 : 10}
                    placeholder="150"
                  />
                </div>
              ) : (
                <div className={styles.formRow}>
                  <SelectField
                    label="Fat (optional)"
                    value={fatId}
                    onChange={setFatId}
                    options={FOODS_BY_GROUP.fat}
                    placeholder="Choose fat…"
                  />
                  <AmountField
                    label={usesUnits(fatId) ? "Amount (units)" : "Amount (g)"}
                    value={fatAmount}
                    onChange={setFatAmount}
                    step={usesUnits(fatId) ? 1 : 2}
                    placeholder="20"
                  />
                </div>
              )}
            </section>
          )}

          {/* Step 4: Cooking Oil (optional) */}
          {step === 3 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 4: Cooking Oil (optional)</h3>
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

          {/* Step 5: Summary & Grocery */}
          {step === 4 && (
            <>
              <section className={styles.section}>
                <h3 className={styles.h3}>Step 5: Summary</h3>
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
                <h3 className={styles.h3}>Grocery (Raw) Estimate</h3>
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
                        // allow empty while typing; keep only digits
                        const v = e.target.value.replace(/[^\d]/g, "");
                        setMealCountStr(v);
                      }}
                      onBlur={(e) => {
                        // normalize on blur to at least 1
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
                    <GroceryRow
                      label={`Protein (${
                        calc.names.proteinNames.length
                          ? calc.names.proteinNames.join(", ")
                          : "—"
                      })`}
                      one={calc.raw.protein}
                      many={calc.list.protein}
                    />
                    <GroceryRow
                      label={`Vegetable (${calc.names.vFood?.name ?? "—"})`}
                      one={calc.raw.veg}
                      many={calc.list.veg}
                    />
                    {fruitId && toNum(fruitAmount) > 0 && (
                      <GroceryRow
                        label={`Fruit (${calc.names.fruitFood?.name ?? "—"})`}
                        one={calc.raw.fruit}
                        many={calc.list.fruit}
                      />
                    )}
                    {path === "carb" && (
                      <GroceryRow
                        label={`Carb (${calc.names.cFood?.name ?? "—"})`}
                        one={calc.raw.carb}
                        many={calc.list.carb}
                      />
                    )}
                    {path === "fat" && (
                      <GroceryRow
                        label={`Fat (${calc.names.fFood?.name ?? "—"})`}
                        one={calc.raw.fat}
                        many={calc.list.fat}
                      />
                    )}
                    {usedOil && (
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
                  </tbody>
                </table>
              </section>
            </>
          )}

          {/* Nav buttons */}
          <div className={styles.stepNav}>
            <button
              className={styles.secondaryBtn}
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                className={styles.primaryBtn}
                disabled={!canNext()}
                onClick={() =>
                  setStep((s) => Math.min(steps.length - 1, s + 1))
                }
              >
                Next
              </button>
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

  // ---- local helpers for proteins ----
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

/* ---------- Subcomponents ---------- */

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
        onChange={(e) => onChange(e.target.value)} // keep as string
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

/* ---------- Helpers ---------- */

function usesUnits(foodId) {
  if (!foodId) return false;
  const food = FOOD_BY_ID[foodId];
  return food?.unit?.kind === "perUnit" || food?.unit?.kind === "per10g";
}
function firstProteinFood(proteins) {
  const first = proteins.find((r) => r.id);
  return first ? FOOD_BY_ID[first.id] : null;
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
