export function getFriendlyFirebaseError(code) {
  const errorMap = {
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/user-not-found": "No account found with this email.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Try a stronger one.",
    "auth/invalid-credential": "Invalid credentials. Please check your email and password.",
    "auth/missing-email": "Please enter your email address.",
    "auth/too-many-requests": "Too many failed attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
    "auth/requires-recent-login": "Please log in again to perform this action.",
  };

  return errorMap[code] || "An unexpected error occurred. Please try again.";
}
