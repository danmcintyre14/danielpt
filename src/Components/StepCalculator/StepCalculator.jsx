import { useState } from 'react';
import styles from '../StepCalculator/StepCalculator.module.css';
import MemberAuth from '../MemberAuth/MemberAuth';
import Button from '../Button/Button';

function StepCalculator({ isLoggedIn, onLogin, onCalorieCalculated }) {
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [calories, setCalories] = useState(null);
  const [activityMultiplier, setActivityMultiplier] = useState('');
  const [adjustedCalories, setAdjustedCalories] = useState(null);
  const [goal, setGoal] = useState('');
  const [finalCalories, setFinalCalories] = useState(null);
  const [started, setStarted] = useState(false);
  const [closed, setClosed] = useState(true);

  if (closed) {
    return (
      <div className={styles.container}>
        <Button mode="filled" onClick={() => setClosed(false)}>
          Open Calculator
        </Button>
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!height || !weight || !age || !gender) {
        alert('Please enter valid values for all fields');
        return;
      }

      const h = parseFloat(height);
      const w = parseFloat(weight);
      const a = parseFloat(age);

      const baseCalories =
        gender === 'male'
          ? 10 * w + 6.25 * h - 5 * a + 5
          : 10 * w + 6.25 * h - 5 * a - 161;

      setCalories(baseCalories.toFixed(0));
      setStep(2);
    } else if (step === 2) {
      if (!activityMultiplier) {
        alert('Please select an activity level');
        return;
      }

      const adjusted = parseFloat(calories) * parseFloat(activityMultiplier);
      setAdjustedCalories(adjusted.toFixed(0));
      setStep(3);
    } else if (step === 3) {
      if (!goal) {
        alert('Please select a goal');
        return;
      }

      let adjustment = 0;
      if (goal === 'lose') adjustment = -500;
      if (goal === 'maintain') adjustment = 0;
      if (goal === 'gain') adjustment = 300;

      const final = parseFloat(adjustedCalories) + adjustment;
      setFinalCalories(final.toFixed(0));
      if (onCalorieCalculated) {
        onCalorieCalculated(final.toFixed(0));
      }
      setStep(4);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setStep(1);
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setCalories(null);
    setActivityMultiplier('');
    setAdjustedCalories(null);
    setGoal('');
    setFinalCalories(null);
    setStarted(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeContainer}>
        <button onClick={() => setClosed(true)} className={styles.closeButton}>x</button>
      </div>

      {!started ? (
        <div className={styles.intro}>
          <h2>Calculate Your Calories Based On Your Goals</h2>
          <Button mode="filled" onClick={() => setStarted(true)}>Calculate</Button>
        </div>
      ) : (
        <div>
          {/* === STEP INDICATOR + PROGRESS BAR === */}
          <p className={styles.stepIndicator}>Step {step} of 4</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {/* === STEP 1 === */}
          {step === 1 && (
            <form onSubmit={handleNext} className={styles.form}>
              <input
                type="text"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <input
                type="text"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <fieldset>
                <div className={styles.genderGroup}>
                  <label className={styles.genderOption}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span>Male</span>
                  </label>

                  <label className={styles.genderOption}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span>Female</span>
                  </label>
                </div>
              </fieldset>

              <Button mode="filled" type="submit">Next</Button>
            </form>
          )}

          {/* === STEP 2 === */}
          {step === 2 && (
            <div className={styles.step}>
              <h3>Select Your Activity Level</h3>
              <div className={styles.goalButtons}>
                {[
                  { value: '1.2', label: 'No Exercise' },
                  { value: '1.375', label: 'Light Exercise 1-3 Days/Week' },
                  { value: '1.55', label: 'Moderate Exercise 3-5 Days/Week' },
                  { value: '1.725', label: 'Hard Exercise 5-6 Days/Week' },
                  { value: '1.9', label: 'Very Hard Exercise + Physical Job' },
                ].map((opt) => (
                  <Button
                    key={opt.value}
                    mode={activityMultiplier === opt.value ? 'filled' : 'outline'}
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

          {/* === STEP 3 === */}
          {step === 3 && (
            <div className={styles.step}>
              <h3>What is your goal?</h3>
              <div className={styles.goalButtons}>
                <Button mode={goal === 'lose' ? 'filled' : 'outline'} onClick={() => setGoal('lose')}>
                  Fat Loss
                </Button>
                <Button mode={goal === 'maintain' ? 'filled' : 'outline'} onClick={() => setGoal('maintain')}>
                  Maintain
                </Button>
                <Button mode={goal === 'gain' ? 'filled' : 'outline'} onClick={() => setGoal('gain')}>
                  Muscle Gain
                </Button>
              </div>

              <div className={styles.buttonGroup}>
                <Button mode="outline" onClick={handleBack}>Back</Button>
                <Button mode="filled" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {/* === STEP 4 === */}
          {step === 4 && (
            <div className={styles.step}>
              <h3>Your required calories to {goal} weight are {finalCalories} kcal</h3>

              {!isLoggedIn ? (
                <div className={styles.optInBox}>
                  <p>
                    Unlock your full calorie breakdown, macros, and beginner workout plan inside <strong>Fit Foundations</strong>.
                  </p>
                  <MemberAuth onLogin={onLogin} />
                </div>
              ) : (
                <p>Welcome back! Check your Members Area for your full recommendations.</p>
              )}

              <div className={styles.buttonGroup}>
                <Button mode="outline" onClick={handleBack}>Back</Button>
                <Button mode="filled" onClick={resetForm}>Reset</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StepCalculator;



