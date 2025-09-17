// src/Components/Button/Button.jsx
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
  children,
  mode = "filled",
  href,         // external or internal URL (falls back to <a>)
  to,           // React Router path (renders <Link>)
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  className = "",
}) {
  const variantClass = styles[mode] || styles.filled;
  const classNames = `${styles.button} ${variantClass} ${className}`;

  if (to) {
    // SPA navigation (React Router)
    return (
      <Link to={to} className={classNames} onClick={onClick} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  if (href) {
    // External/internal traditional link
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={classNames}
        onClick={onClick}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  // Default button
  return (
    <button type={type} onClick={onClick} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
}



