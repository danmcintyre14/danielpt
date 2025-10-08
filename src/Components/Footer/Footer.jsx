// src/Components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>•</span>
        <Link to="/terms">Terms & Conditions</Link>
      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} Daniel McIntyre. All rights reserved.
      </p>
    </footer>
  );
}

