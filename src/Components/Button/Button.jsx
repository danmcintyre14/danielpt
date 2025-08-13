// src/Components/Button/Button.jsx
import styles from "./Button.module.css";

export default function Button({ children, mode = "filled", href, onClick, type = "button", disabled }) {
  const classNames = `${styles.button} ${mode === "outline" ? styles.outline : styles.filled}`;

  if (href) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </button>
  );
}


