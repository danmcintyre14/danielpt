// src/pages/MembersArea/MembersArea.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, reload } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Button from "../../Components/Button/Button";

import NutritionCalculator from "../../Components/NutritionCalculator/NutritionCalculator";
import EnergyExpenditureCalculator from "../../Components/EnergyExpenditureCalculator/EnergyExpenditureCalculator";
import VideoLibrary from "../../Components/VideoLibrary/VideoLibrary";
import PDFLibrary from "../../Components/PDFLibrary/PDFLibrary";
import RecipeLibrary from "../../Components/RecipeLibrary/RecipeLibrary";

import styles from "./MembersArea.module.css";

export default function MembersArea() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        navigate("/membersPage");
        return;
      }
      await reload(u);
      setUser(u);
      setLoading(false);
      if (!u.emailVerified) {
        // Push back to signup with message
        navigate("/membersPage", { state: { needsVerification: true } });
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/membersPage");
  };

  if (loading) {
    return <div className={styles.container}><p>Loading...</p></div>;
  }

  if (!user || !user.emailVerified) {
    return null; // Redirect in effect
  }

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.greeting}>
          <h1>Welcome{user?.displayName ? `, ${user.displayName}` : ""}</h1>
          <p>You’re verified and logged in. Explore your tools below.</p>
        </div>
        <Button mode="filled" onClick={handleLogout}>Logout</Button>
      </div>

      <div className={styles.calculatorsGrid}>
        <NutritionCalculator />
        <EnergyExpenditureCalculator />
      </div>

      <VideoLibrary />
      <PDFLibrary />
      <RecipeLibrary />
    </div>
  );
}
