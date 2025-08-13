import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
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

        if (!cred.user.emailVerified) {
          setInfoMessage("Please verify your email before logging in.");
          return; // don't navigate yet
        }

        // Verified → go to gated area
        navigate("/membersArea");
        return;
      } else {
        // SIGN UP
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        if (name) {
          await updateProfile(cred.user, { displayName: name });
        }

        await sendEmailVerification(cred.user);
        setInfoMessage("Verification email sent! Please check your inbox.");
        // Do NOT navigate yet; user must verify and then log in
        return;
      }
    } catch (err) {
      console.error("Auth error:", err?.code, err?.message);
      setError(getFriendlyFirebaseError(err?.code || "unknown"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setInfoMessage("");

    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error("Reset error:", err?.code, err?.message);
      setError(getFriendlyFirebaseError(err?.code || "unknown"));
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "Member Login" : "Sign Up"}</h2>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}

      <form onSubmit={handleAuth}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
            required
          />
        </div>

        <Button mode="filled" type="submit" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </Button>

        {isLogin && (
          <p onClick={handlePasswordReset} className={styles.forgotPassword}>
            Forgot Password?
          </p>
        )}
      </form>

      <p className={styles.switchMode}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className={styles.switchButton}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}



