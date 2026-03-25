import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
  children,
  mode = "filled",
  href,
  to,
  onClick,
  type = "button",
  disabled = false,
  target,
  rel,
  className = "",
}) {
  // 👉 allow multiple modes like "filled small"
  const modes = mode.split(" ");
  const variantClasses = modes
    .map((m) => styles[m])
    .filter(Boolean)
    .join(" ");

  const classNames = `${styles.button} ${variantClasses} ${className}`.trim();

  // 👉 SPA navigation
  if (to) {
    return (
      <Link
        to={to}
        className={classNames}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  // 👉 External / internal link
  if (href) {
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

  // 👉 Default button
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



