// src/Pages/MembersArea/MembersArea.jsx

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, reload } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { auth } from "../../firebase";
import { videoData } from "../../data/data";

import NutritionCalculator from "../../Components/NutritionCalculator/NutritionCalculator";
import EnergyExpenditureCalculator from "../../Components/EnergyExpenditureCalculator/EnergyExpenditureCalculator";
import ModularMealBuilder from "../../Components/ModularMealBuilder/ModularMealBuilder";
import VideoLibrary from "../../Components/VideoLibrary/VideoLibrary";
import PDFLibrary from "../../Components/PDFLibrary/PDFLibrary";
import WhatsAppContact from "../../Components/WhatsAppContact/WhatsAppContact";
import SEO from "../../Components/SEO/SEO";

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
        navigate("/rebuild");
        return;
      }

      await reload(u);

      setUser(u);
      setLoading(false);

      if (!u.emailVerified) {
        navigate("/rebuild", {
          state: { needsVerification: true },
        });
      }
    });

    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/rebuild");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi Dan! I have a question about The Rebuild."
    );

    window.open(
      `https://wa.me/971526497126?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =========================
  // VIDEO CATEGORIES
  // =========================

  const resistanceVideos = videoData.filter(
    (video) => video.category === "resistance"
  );

  const mobilityVideos = videoData.filter(
    (video) => video.category === "mobility"
  );

  const nutritionVideos = videoData.filter(
    (video) => video.category === "nutrition"
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading The Rebuild...</p>
      </div>
    );
  }

  if (!user || !user.emailVerified) {
    return null;
  }

  return (
    <div>
      <SEO
        title="The Rebuild — Member Hub | Daniel McIntyre"
        description="Your Rebuild hub for training, nutrition, mobility and practical tools to help you build your health and fitness."
        canonical="https://daniel-mcintyre.com/rebuild/hub"
        robots="noindex,nofollow,noarchive"
        siteName="The Rebuild by Daniel McIntyre"
        image="https://daniel-mcintyre.com/logo512.png"
        locale="en_GB"
      />

      <main className={styles.container}>
        {/* =========================
            WELCOME
        ========================= */}

        <div className={styles.topbar}>
          <div className={styles.accountActions}>
            <button
              type="button"
              className={styles.contactButton}
              onClick={handleWhatsApp}
            >
              <FaWhatsapp />
              <span>Contact</span>
            </button>

            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className={styles.greeting}>
            <p className={styles.eyebrow}>
              THE REBUILD
            </p>

            <h1>
              Welcome
              {user?.displayName
                ? `, ${user.displayName}`
                : ""}
            </h1>

            <p>
              Start here. I'll show you how to use The Rebuild and what to
              focus on first.
            </p>
          </div>
        </div>

        {/* =========================
            START HERE / VSL
        ========================= */}

        <section className={styles.introSection}>
          <div className={styles.sectionHeading}>
            <span>START HERE</span>

            <h2>How to use The Rebuild</h2>

            <p>
              Watch this first. I'll explain how The Rebuild works and the
              order I recommend working through each section.
            </p>
          </div>

          <div className={styles.videoPlaceholder}>
            <div>
              <strong>WELCOME VIDEO</strong>

              <p>
                Your Rebuild introduction video will go here.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            01 — TRAINING
        ========================= */}

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>01</span>

            <h2>Your Training Plan</h2>

            <p>
              Start with these workouts. I'll explain how to perform each
              session, how hard to train and how to progress gradually.
            </p>
          </div>

          <div className={styles.workoutGrid}>
            {/* Workout A */}

            <div className={styles.workoutCard}>
              <div className={styles.workoutVideo}>
                <span>WORKOUT VIDEO</span>
              </div>

              <div className={styles.workoutContent}>
                <span className={styles.workoutLabel}>
                  WORKOUT A
                </span>

                <h3>Workout A</h3>

                <p>
                  Your first full-body resistance training session.
                </p>
              </div>
            </div>

            {/* Workout B */}

            <div className={styles.workoutCard}>
              <div className={styles.workoutVideo}>
                <span>WORKOUT VIDEO</span>
              </div>

              <div className={styles.workoutContent}>
                <span className={styles.workoutLabel}>
                  WORKOUT B
                </span>

                <h3>Workout B</h3>

                <p>
                  Your second full-body resistance training session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            02 — EXERCISE LIBRARY
        ========================= */}

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>02</span>

            <h2>Exercise Library</h2>

            <p>
              Use the exercise library alongside your workouts to learn the
              movements, improve your technique and train with confidence.
            </p>
          </div>

          {/* Resistance */}

          {resistanceVideos.length > 0 && (
            <VideoLibrary
              title="Resistance Training"
              subtitle="Exercise demonstrations covering setup, technique and common mistakes."
              videos={resistanceVideos}
            />
          )}

          {/* Mobility */}

          {mobilityVideos.length > 0 && (
            <div className={styles.librarySpacing}>
              <VideoLibrary
                title="Mobility"
                subtitle="Mobility exercises to help you move better and prepare your body for training."
                videos={mobilityVideos}
              />
            </div>
          )}
        </section>

        {/* =========================
            03 — NUTRITION
        ========================= */}

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>03</span>

            <h2>Nutrition</h2>

            <p>
              Nutrition doesn't need to be complicated. Start by understanding
              how much energy and protein you need, then use the tools below to
              help structure your food around those targets.
            </p>
          </div>

          <div className={styles.calculatorsGrid}>
            <NutritionCalculator />

            <EnergyExpenditureCalculator />

            <ModularMealBuilder />
          </div>

          {nutritionVideos.length > 0 && (
            <div className={styles.librarySpacing}>
              <VideoLibrary
                title="Nutrition Videos"
                subtitle="Simple nutrition lessons to help you understand the fundamentals and make better decisions."
                videos={nutritionVideos}
              />
            </div>
          )}
        </section>

        {/* =========================
            04 — GUIDES
        ========================= */}

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <span>04</span>

            <h2>Guides</h2>

            <p>
              Use these guides when you want to learn more about a specific
              area of your training, nutrition or health.
            </p>
          </div>

          <PDFLibrary />
        </section>

        {/* =========================
            WHATSAPP SUPPORT
        ========================= */}

        <section className={styles.supportSection}>
          <WhatsAppContact
            headline="Need some help?"
            subhead="If you're unsure about your training, nutrition or how to use The Rebuild, send me a message."
            message="Hi Dan! I have a question about The Rebuild."
            buttonText="Message me on WhatsApp"
          />
        </section>
                {/* =========================
            LEGAL FOOTER
        ========================= */}

      <footer className={styles.legalFooter}>
  <span>© 2026 Daniel McIntyre</span>

  <span className={styles.footerDivider}>•</span>

  <Link to="/privacy-policy">
    Privacy Policy
  </Link>

  <span className={styles.footerDivider}>•</span>

  <Link to="/terms">
    Terms &amp; Conditions
  </Link>
</footer>
      </main>
    </div>
  );
}