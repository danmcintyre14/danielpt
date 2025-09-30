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
  const steps = ["Protein", "Vegetables", "Carb or Fat", "Cooking Oil", "Summary"];
  const [step, setStep] = useState(0);

  // Optional coaching targets
  const [useTargets, setUseTargets] = useState(false);
  const [targetKcal, setTargetKcal] = useState(defaultTargets.kcal);
  const [proteinMin, setProteinMin] = useState(defaultTargets.proteinMin);
  const [proteinMax, setProteinMax] = useState(defaultTargets.proteinMax);

  // Step 1: Protein (placeholder first)
  const [proteinId, setProteinId] = useState("");   // "" means not chosen yet
  const [proteinAmount, setProteinAmount] = useState(""); // keep as string

  // Step 2: Veg
  const [vegId, setVegId] = useState("");
  const [vegAmount, setVegAmount] = useState("");

  // Step 3: Carb or Fat
  const [path, setPath] = useState("carb");
  const [carbId, setCarbId] = useState("");
  const [carbAmount, setCarbAmount] = useState("");
  const [fatId, setFatId] = useState("");
  const [fatAmount, setFatAmount] = useState("");

  // Step 4: Oil (optional)
  const [usedOil, setUsedOil] = useState(false);
  const [oilId, setOilId] = useState("olive_oil"); // default is fine; step is optional
  const [oilGrams, setOilGrams] = useState("");

  // Step 5: Grocery multiplier
  const [mealCount, setMealCount] = useState(1);

  const calc = useMemo(() => {
    const pFood = proteinId ? FOOD_BY_ID[proteinId] : null;
    const vFood = vegId ? FOOD_BY_ID[vegId] : null;
    const cFood = carbId ? FOOD_BY_ID[carbId] : null;
    const fFood = fatId ? FOOD_BY_ID[fatId] : null;
    const oilFood = oilId ? FOOD_BY_ID[oilId] : null;

    const p = pFood ? scaleFood(pFood, toNum(proteinAmount)) : empty();
    const v = vFood ? scaleFood(vFood, toNum(vegAmount)) : empty();
    const c = path === "carb" ? (cFood ? scaleFood(cFood, toNum(carbAmount)) : empty()) : empty();
    const f = path === "fat" ? (fFood ? scaleFood(fFood, toNum(fatAmount)) : empty()) : empty();

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

    const total = sumItems([p, v, c, f, oil]);

    // coaching only when enabled AND we have at least a protein chosen
    let suggestion = null;
    if (useTargets && (pFood || vFood || cFood || fFood || (usedOil && oilFood))) {
      const kcalGap = targetKcal - total.kcal;
      if (Math.abs(kcalGap) <= 30 && total.p >= proteinMin && total.p <= proteinMax) {
        suggestion = "Perfect! You’re right on target for calories and protein.";
      } else {
        if (kcalGap > 0) {
          const adjFood =
            path === "carb" ? (cFood || pFood || vFood) : (usedOil ? oilFood : (fFood || pFood || vFood));
          if (adjFood) {
            const addGrams = gramsToCloseKcalGap(adjFood, kcalGap);
            suggestion = `Add ~${roundTo(addGrams, path === "carb" ? 5 : 2)}g ${adjFood.name.toLowerCase()} to hit ~${targetKcal} kcal.`;
          }
        } else if (kcalGap < 0) {
          const overBy = Math.abs(kcalGap);
          if (usedOil && oilFood && toNum(oilGrams) > 0) {
            const reduce = gramsToCloseKcalGap(oilFood, overBy);
            suggestion = `Reduce cooking oil by ~${roundTo(reduce, 2)}g.`;
          } else {
            const adjFood = path === "carb" ? cFood : fFood;
            if (adjFood) {
              const reduce = gramsToCloseKcalGap(adjFood, overBy);
              suggestion = `Reduce ${adjFood.name.toLowerCase()} by ~${roundTo(reduce, path === "carb" ? 5 : 2)}g.`;
            }
          }
        }
        if (total.p < proteinMin) {
          suggestion = (suggestion ? suggestion + " " : "") + `Tip: increase protein to ≥${proteinMin}g.`;
        } else if (total.p > proteinMax) {
          suggestion = (suggestion ? suggestion + " " : "") + `Tip: slightly reduce protein to ≤${proteinMax}g (optional).`;
        }
      }
    }

    // grocery: convert cooked to raw if a food is chosen
    const raw = {
      protein: pFood ? cookedToRaw(pFood.id, p.grams) : 0,
      veg: vFood ? cookedToRaw(vFood.id, v.grams) : 0,
      carb: path === "carb" && cFood ? cookedToRaw(cFood.id, c.grams) : 0,
      fat: path === "fat" && fFood ? cookedToRaw(fFood.id, f.grams) : 0,
      oil: usedOil ? Math.round(oil.grams) : 0,
    };
    const list = {
      protein: raw.protein * mealCount,
      veg: raw.veg * mealCount,
      carb: raw.carb * mealCount,
      fat: raw.fat * mealCount,
      oil: raw.oil * mealCount,
    };
    const oilVol = usedOil ? oilVolumeFromGrams(list.oil) : null;

    return { items: { p, v, c, f, oil }, total, suggestion, raw, list, oilVol, names: { pFood, vFood, cFood, fFood } };
  }, [
    proteinId, proteinAmount,
    vegId, vegAmount,
    path, carbId, carbAmount,
    fatId, fatAmount,
    usedOil, oilId, oilGrams,
    mealCount,
    useTargets, targetKcal, proteinMin, proteinMax,
  ]);

  // Guards (require a selection + amount > 0)
  const canNext = () => {
    if (step === 0) return !!proteinId && toNum(proteinAmount) > 0;
    if (step === 1) return !!vegId && toNum(vegAmount) > 0;
    if (step === 2) {
      if (path === "carb") return !!carbId && toNum(carbAmount) > 0;
      return !!fatId && toNum(fatAmount) > 0;
    }
    if (step === 3) return usedOil ? toNum(oilGrams) >= 0 : true;
    return true;
  };

  function handleReset() {
    setStep(0);
    setProteinId("");   setProteinAmount("");
    setVegId("");       setVegAmount("");
    setCarbId("");      setCarbAmount("");
    setFatId("");       setFatAmount("");
    setUsedOil(false);  setOilGrams("");
    setMealCount(1);
    setUseTargets(false);
    setTargetKcal(defaultTargets.kcal);
    setProteinMin(defaultTargets.proteinMin);
    setProteinMax(defaultTargets.proteinMax);
  }

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button className={`${styles.openBtn} ${styles.green}`} onClick={() => setIsOpen(true)}>
          <FaUtensils className={styles.icon} />
          <span>Open Modular Meal Builder</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.calculatorCard}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          <h2 className={styles.title}>Modular Meal Builder</h2>
          <p className={styles.subtitle}>Build a meal in 5 quick steps.</p>

          {/* Live stats + coaching toggle + reset */}
          <div className={styles.statsBar}>
            <div className={styles.statChip}>
              <span className={styles.chipLabel}>Calories</span>
              <div className={styles.chipValueWrap}>
                <strong className={useTargets && Math.abs(targetKcal - calc.total.kcal) <= 30 ? styles.ok : ""}>
                  {calc.total.kcal}
                </strong>
                <small className={styles.chipUnit}>{useTargets ? ` / ${targetKcal} ` : ""}kcal</small>
              </div>
            </div>

            <div className={styles.statChip}>
              <span className={styles.chipLabel}>Protein</span>
              <div className={styles.chipValueWrap}>
                <strong className={useTargets && calc.total.p >= proteinMin && calc.total.p <= proteinMax ? styles.ok : ""}>
                  {calc.total.p}
                </strong>
                <small className={styles.chipUnit}>{useTargets ? ` / ${proteinMin}–${proteinMax} ` : ""}g</small>
              </div>
            </div>

            <label className={styles.targetsToggle}>
              <input type="checkbox" checked={useTargets} onChange={(e) => setUseTargets(e.target.checked)} />
              <span>Targets</span>
            </label>

            <button type="button" className={styles.resetBtn} onClick={handleReset}>Reset</button>
          </div>

          {/* Targets form (only when enabled) */}
          {useTargets && (
            <div className={styles.section}>
              <h3 className={styles.h3}>Targets</h3>
              <div className={styles.formRow}>
                <NumberField label="Target kcal" value={String(targetKcal)} onChange={(v) => setTargetKcal(toNum(v))} />
                <NumberField label="Protein min" value={String(proteinMin)} onChange={(v) => setProteinMin(toNum(v))} />
                <NumberField label="Protein max" value={String(proteinMax)} onChange={(v) => setProteinMax(toNum(v))} />
              </div>
            </div>
          )}

          {/* Progress */}
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            <div className={styles.stepLabel}>{step + 1} / {steps.length} — {steps[step]}</div>
          </div>

          {/* Steps */}
          {step === 0 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 1: Choose Protein</h3>
              <div className={styles.formRow}>
                <SelectField
                  label="Protein"
                  value={proteinId}
                  onChange={setProteinId}
                  options={FOODS_BY_GROUP.protein}
                  placeholder="Choose protein…"
                />
                <AmountField
                  label={usesUnits(proteinId) ? "Amount (units)" : "Amount (g)"}
                  value={proteinAmount}
                  onChange={setProteinAmount}
                  step={usesUnits(proteinId) ? 1 : 10}
                  placeholder="150"
                />
              </div>
            </section>
          )}

          {step === 1 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 2: Add Vegetables</h3>
              <div className={styles.formRow}>
                <SelectField
                  label="Vegetable"
                  value={vegId}
                  onChange={setVegId}
                  options={FOODS_BY_GROUP.veg}
                  placeholder="Choose vegetable…"
                />
                <AmountField label="Amount (g)" value={vegAmount} onChange={setVegAmount} step={25} placeholder="150" />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 3: Choose <span className={styles.badge}>Carb</span> or <span className={styles.badge}>Fat</span></h3>
              <div className={styles.toggle}>
                <button type="button" className={`${styles.toggleBtn} ${path === "carb" ? styles.active : ""}`} onClick={() => setPath("carb")}>Carbohydrate</button>
                <button type="button" className={`${styles.toggleBtn} ${path === "fat" ? styles.active : ""}`} onClick={() => setPath("fat")}>Fat</button>
              </div>

              {path === "carb" ? (
                <div className={styles.formRow}>
                  <SelectField
                    label="Carb"
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
                    label="Fat"
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

          {step === 3 && (
            <section className={styles.section}>
              <h3 className={styles.h3}>Step 4: Cooking Oil (optional)</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Used oil?</label>
                  <select className={styles.select} value={usedOil ? "yes" : "no"} onChange={(e) => setUsedOil(e.target.value === "yes")}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                {usedOil && (
                  <>
                    <div className={styles.formGroup}>
                      <label>Oil type</label>
                      <select className={styles.select} value={oilId} onChange={(e) => setOilId(e.target.value)}>
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
                        onBlur={(e) => setOilGrams(e.target.value === "" ? "" : String(toNum(e.target.value)))}
                      />
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

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
                {useTargets && calc.suggestion && <p className={styles.suggestion}>{calc.suggestion}</p>}
              </section>

              <section className={styles.section}>
                <h3 className={styles.h3}>Grocery (Raw) Estimate</h3>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>How many meals like this?</label>
                    <input
                      className={styles.input}
                      type="number"
                      min={1}
                      step={1}
                      value={mealCount}
                      onChange={(e) => setMealCount(Math.max(1, parseInt(e.target.value || "1", 10)))}
                    />
                  </div>
                </div>

                <table className={styles.table} style={{ marginTop: ".5rem" }}>
                  <thead>
                    <tr><th>Item</th><th>Raw for 1 meal</th><th>Raw × {mealCount}</th></tr>
                  </thead>
                  <tbody>
                    <GroceryRow label={`Protein (${calc.names.pFood?.name ?? "—"})`} one={calc.raw.protein} many={calc.list.protein} />
                    <GroceryRow label={`Vegetable (${calc.names.vFood?.name ?? "—"})`} one={calc.raw.veg} many={calc.list.veg} />
                    {path === "carb" && <GroceryRow label={`Carb (${calc.names.cFood?.name ?? "—"})`} one={calc.raw.carb} many={calc.list.carb} />}
                    {path === "fat" && <GroceryRow label={`Fat (${calc.names.fFood?.name ?? "—"})`} one={calc.raw.fat} many={calc.list.fat} />}
                    {usedOil && (
                      <tr>
                        <td>Cooking oil</td>
                        <td>{calc.raw.oil} g</td>
                        <td>
                          {calc.list.oil} g
                          {calc.oilVol && <> · ~{calc.oilVol.ml} ml (≈ {calc.oilVol.tbsp} tbsp)</>}
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
            <button className={styles.secondaryBtn} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              Back
            </button>
            {step < steps.length - 1 ? (
              <button className={styles.primaryBtn} disabled={!canNext()} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
                Next
              </button>
            ) : (
              <button className={styles.primaryBtn} onClick={() => setIsOpen(false)}>Done</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function AmountField({ label, value, onChange, step = 10, placeholder = "150" }) {
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
        onChange={(e) => onChange(e.target.value)}  // keep as string
        onBlur={(e) => onChange(e.target.value === "" ? "" : String(toNum(e.target.value)))}
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

function SelectField({ label, value, onChange, options, placeholder = "Choose…" }) {
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

function empty() {
  return { kcal: 0, p: 0, c: 0, f: 0, fiber: 0, grams: 0 };
}

function roundTo(n, step) {
  if (!n || !step) return 0;
  return Math.round(n / step) * step;
}

function toNum(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.max(0, n) : 0; // treat ""/NaN as 0, clamp ≥ 0
}





