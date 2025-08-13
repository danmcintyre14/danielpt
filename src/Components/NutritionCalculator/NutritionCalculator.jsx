import { useState } from "react";
import { FaAppleAlt } from "react-icons/fa"; // 🍎 Icon for Nutrition
import styles from "./NutritionCalculator.module.css";

export default function NutritionCalculator() {
  const [isOpen, setIsOpen] = useState(false);

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState(1.2);
  const [goal, setGoal] = useState("maintenance");
  const [proteinFactor, setProteinFactor] = useState(1.8);
  const [fatPercent, setFatPercent] = useState(25);

  const calculateCalories = () => {
    if (!weight || !height || !age) return null;

    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let tdee = bmr * activity;

    if (goal === "fatloss") tdee *= 0.8;
    if (goal === "muscle") tdee *= 1.15;

    const proteinGrams = weight * proteinFactor;
    const proteinCalories = proteinGrams * 4;

    const fatCalories = (fatPercent / 100) * tdee;
    const fatGrams = fatCalories / 9;

    const carbCalories = tdee - (proteinCalories + fatCalories);
    const carbGrams = carbCalories / 4;

    return {
      calories: Math.round(tdee),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
    };
  };

  const results = calculateCalories();

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          <FaAppleAlt className={styles.icon} />
          <span>Open Nutrition Calculator</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.calculatorCard}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          <h2 className={styles.title}>Nutrition Calculator</h2>

          {/* Inputs grouped for responsive layout */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Age:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Weight (kg):</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Height (cm):</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Activity Level:</label>
              <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
                <option value={1.2}>Sedentary</option>
                <option value={1.375}>Lightly Active</option>
                <option value={1.55}>Moderately Active</option>
                <option value={1.725}>Very Active</option>
                <option value={1.9}>Extra Active</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Goal:</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="fatloss">Fat Loss</option>
                <option value="maintenance">Maintenance</option>
                <option value="muscle">Muscle Gain</option>
              </select>
            </div>
          </div>

          {/* ✅ Colored sliders */}
          <div className={styles.sliderGroup}>
            <label className={styles.proteinLabel}>Protein (g/kg): {proteinFactor}</label>
            <input
              type="range"
              min="1.6"
              max="2"
              step="0.1"
              value={proteinFactor}
              onChange={(e) => setProteinFactor(parseFloat(e.target.value))}
              className={styles.proteinSlider}
            />
          </div>

          <div className={styles.sliderGroup}>
            <label className={styles.fatLabel}>Fat (% of calories): {fatPercent}%</label>
            <input
              type="range"
              min="25"
              max="40"
              step="1"
              value={fatPercent}
              onChange={(e) => setFatPercent(parseFloat(e.target.value))}
              className={styles.fatSlider}
            />
          </div>

          {results && (
            <div className={styles.results}>
              <h3>Your Targets</h3>
              <p>Calories: <strong>{results.calories}</strong></p>
              <p>Protein: <strong>{results.protein} g</strong></p>
              <p>Fat: <strong>{results.fat} g</strong></p>
              <p>Carbs: <strong>{results.carbs} g</strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

