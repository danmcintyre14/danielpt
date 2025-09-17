import { useState } from "react";
import { FaWalking } from "react-icons/fa";
import styles from "./StepCalculator.module.css";
import MemberAuth from "../MemberAuth/MemberAuth";
import Button from "../Button/Button";

export default function StepCalculator({ isLoggedIn, onLogin, onCalorieCalculated }) {
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [activityMultiplier, setActivityMultiplier] = useState("");
  const [goal, setGoal] = useState("");

  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [finalCalories, setFinalCalories] = useState(null);

  const resetAll = () => {
    setStep(1);
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setActivityMultiplier("");
    setGoal("");
    setBmr(null);
    setTdee(null);
    setFinalCalories(null);
  };

  const handleNext = (e) => {
    e?.preventDefault?.();
    if (step === 1) {
      if (!gender || !age || !height || !weight) {
        alert("Please complete all fields.");
        return;
      }
      const a = parseFloat(age);
      const h = parseFloat(height);
      const w = parseFloat(weight);

      const base =
        gender === "male"
          ? 10 * w + 6.25 * h - 5 * a + 5
          : 10 * w + 6.25 * h - 5 * a - 161;

      setBmr(Math.round(base));
      setStep(2);
    } else if (step === 2) {
      if (!activityMultiplier) {
        alert("Please choose an activity level.");
        return;
      }
      const total = Math.round(bmr * parseFloat(activityMultiplier));
      setTdee(total);
      setStep(3);
    } else if (step === 3) {
      if (!goal) {
        alert("Please choose a goal.");
        return;
      }
      let adjustment = 0;
      if (goal === "fatloss") adjustment = -500;
      if (goal === "maintenance") adjustment = 0;
      if (goal === "muscle") adjustment = 300;

      const final = Math.round(tdee + adjustment);
      setFinalCalories(final);
      onCalorieCalculated?.(final);
      setStep(4);
    }
  };

  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className={styles.container}>
      {!isOpen ? (
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          <FaWalking className={styles.icon} />
          <span>Open Calorie Calculator</span>
        </button>
      ) : (
        <div className={styles.calculatorCard}>
          <button className={styles.closeBtn} onClick={() => { setIsOpen(false); resetAll(); }} aria-label="Close">
            ✕
          </button>

          {/* Title */}
          <h2 className={styles.title}>Step Calculator</h2>
          <p className={styles.sub}>Estimate daily calories using your details, activity and goal.</p>

          {/* Step indicator + progress */}
          <p className={styles.stepIndicator}>Step {step} of 4</p>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={(step / 4) * 100}
          >
            <div className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }} />
          </div>

          {/* STEP 1: Basics */}
          {step === 1 && (
            <form onSubmit={handleNext} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Gender</label>
                  <div className={styles.genderGroup}>
                    <label className={styles.genderOption}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span>Male</span>
                    </label>
                    <label className={styles.genderOption}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Age</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Years"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Height (cm)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Weight (kg)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 72.5"
                  />
                </div>
              </div>

              <Button mode="filled" type="submit">Next</Button>
            </form>
          )}

          {/* STEP 2: Activity */}
          {step === 2 && (
            <div>
              <h3 className={styles.stepTitle}>Choose Activity Level</h3>
              <div className={styles.goalButtons}>
                {[
                  { value: "1.2", label: "Sedentary" },
                  { value: "1.375", label: "Light (1–3 d/wk)" },
                  { value: "1.55", label: "Moderate (3–5 d/wk)" },
                  { value: "1.725", label: "Hard (5–6 d/wk)" },
                  { value: "1.9", label: "Very Hard + Physical Job" },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    mode={activityMultiplier === opt.value ? "filled" : "outline"}
                    onClick={() => setActivityMultiplier(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>

              <div className={styles.buttonGroup}>
                <Button mode="outline" onClick={handleBack}>Back</Button>
                <Button mode="filled" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {/* STEP 3: Goal */}
          {step === 3 && (
            <div>
              <h3 className={styles.stepTitle}>Choose Your Goal</h3>
              <div className={styles.goalButtons}>
                <Button mode={goal === "fatloss" ? "filled" : "outline"} onClick={() => setGoal("fatloss")}>
                  Fat Loss
                </Button>
                <Button mode={goal === "maintenance" ? "filled" : "outline"} onClick={() => setGoal("maintenance")}>
                  Maintenance
                </Button>
                <Button mode={goal === "muscle" ? "filled" : "outline"} onClick={() => setGoal("muscle")}>
                  Muscle Gain
                </Button>
              </div>

              <div className={styles.buttonGroup}>
                <Button mode="outline" onClick={handleBack}>Back</Button>
                <Button mode="filled" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {/* STEP 4: Result */}
          {step === 4 && (
            <div>
              <div className={styles.results}>
                <h3>Your Targets</h3>
                <p>BMR: <strong>{bmr}</strong> kcal</p>
                <p>TDEE: <strong>{tdee}</strong> kcal</p>
                <p>Recommended: <strong>{finalCalories}</strong> kcal/day</p>
              </div>

              {!isLoggedIn ? (
                <div className={styles.optInBox}>
                  <p>
                    Get macros, starter plan, and guides inside <strong>FitBlueprint</strong>.
                  </p>
                   <div className={styles.optInInner}>
                    <MemberAuth onLogin={onLogin} />
                  </div>  

                </div>
              ) : (
                <p>Welcome back! See your Members Area for full recommendations.</p>
              )}

              <div className={styles.buttonGroup}>
                <Button mode="outline" onClick={handleBack}>Back</Button>
                <Button mode="filled" onClick={resetAll}>Reset</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}





