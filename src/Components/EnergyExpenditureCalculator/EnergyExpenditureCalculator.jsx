import { useState } from "react";
import { FaFireAlt } from "react-icons/fa"; // 🔥 Icon for Energy Expenditure
import { activitiesData } from "../../data/activities";
import styles from "./EnergyExpenditureCalculator.module.css";

export default function EnergyExpenditureCalculator() {
  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState(activitiesData[0].category);
  const [activity, setActivity] = useState(activitiesData[0].activities[0].met);
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");

  const selectedCategory = activitiesData.find((c) => c.category === category);

  const calculateCalories = () => {
    if (!weight || !duration) return null;
    const hours = duration / 60;
    const calories = activity * weight * hours;
    return Math.round(calories);
  };

  const result = calculateCalories();

  return (
    <div className={styles.container}>
      {!isOpen && (
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          <FaFireAlt className={styles.icon} />
          <span>Energy Expenditure Calculator</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.calculatorCard}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          <h2 className={styles.title}>Energy Expenditure Calculator</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Category:</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const firstActivity = activitiesData.find(
                    (c) => c.category === e.target.value
                  ).activities[0];
                  setActivity(firstActivity.met);
                }}
              >
                {activitiesData.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Activity:</label>
              <select
                value={activity}
                onChange={(e) => setActivity(parseFloat(e.target.value))}
              >
                {selectedCategory.activities.map((act) => (
                  <option key={act.name} value={act.met}>
                    {act.name} (MET {act.met})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Duration (minutes):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {result !== null && (
            <div className={styles.results}>
              <h3>Calories Burned</h3>
              <p><strong>{result}</strong> kcal</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

