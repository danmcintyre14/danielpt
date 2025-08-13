import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  reload,
} from "firebase/auth";
import { getFriendlyFirebaseError } from "../../utils/firebaseErrorHandler";
import styles from "./MemberAuth.module.css";
import Button from "../Button/Button";

export default function MemberAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN
        const cred = await signInWithEmailAndPassword(auth, email, password);
        // Ensure latest user state
        await reload(cred.user);
        if (!cred.user.emailVerified) {
          setInfoMessage("Verification email sent previously. Please verify your email before logging in.");
          return;
        }
        navigate("/membersArea");
      } else {
        // SIGN UP
        if (!name.trim()) {
          setError("Please enter your name.");
          return;
        }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        await sendEmailVerification(cred.user);
        setInfoMessage(`Verification email sent to ${email}. Please verify, then log in.`);
        setIsLogin(true);
      }
    } catch (err) {
      setError(getFriendlyFirebaseError(err.code) || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setInfoMessage("");
    try {
      if (!auth.currentUser) {
        setError("Please log in first to resend verification.");
        return;
      }
      await sendEmailVerification(auth.currentUser);
      setInfoMessage(`Verification email resent to ${auth.currentUser.email}.`);
    } catch (err) {
      setError(getFriendlyFirebaseError(err.code) || err.message);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setInfoMessage("");
    try {
      if (!email) {
        setError("Enter your email above first.");
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setInfoMessage(`Password reset link sent to ${email}.`);
    } catch (err) {
      setError(getFriendlyFirebaseError(err.code) || err.message);
    }
  };

  return (
    <div className={styles.authCard}>
      <div className={styles.toggleRow}>
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`${styles.toggleBtn} ${isLogin ? styles.active : ""}`}
          aria-pressed={isLogin}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`${styles.toggleBtn} ${!isLogin ? styles.active : ""}`}
          aria-pressed={!isLogin}
        >
          Sign Up
        </button>
      </div>

      {infoMessage && <div className={styles.info}>{infoMessage}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleAuth} className={styles.form}>
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            minLength={6}
          />
        </div>

        <div className={styles.actions}>
          <Button mode="filled" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </Button>
          {isLogin && (
            <button type="button" className={styles.linkBtn} onClick={handlePasswordReset}>
              Forgot password?
            </button>
          )}
        </div>
      </form>

      {isLogin && (
        <button type="button" className={styles.linkBtn} onClick={handleResendVerification}>
          Resend verification email
        </button>
      )}
    </div>
  );
}



