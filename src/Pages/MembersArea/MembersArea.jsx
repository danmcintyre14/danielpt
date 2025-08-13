// src/pages/MembersArea/MembersArea.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/membersPage");
      else setUser(u);
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/membersPage");
  };

  if (!user) return null; // or a loading spinner

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Welcome, {user.displayName || user.email}
        </h2>
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
