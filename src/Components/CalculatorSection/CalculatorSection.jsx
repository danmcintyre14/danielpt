// Components/CalculatorSection/CalculatorSection.jsx
import StepCalculator from '../StepCalculator/StepCalculator';
import styles from './CalculatorSection.module.css';

export default function CalculatorSection({ isLoggedIn, onLogin }) {
  return (
    <div className={styles.section}>
      <h3>Calculate Your Daily Calorie Needs</h3>
      <StepCalculator isLoggedIn={isLoggedIn} onLogin={onLogin} />
    </div>
  );
}
