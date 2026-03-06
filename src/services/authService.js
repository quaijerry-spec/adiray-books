import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

// SIGN UP
export const signupUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendEmailVerification(userCredential.user);

  alert("Account created! Please verify your email.");
};

// LOGIN
export const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// GOOGLE LOGIN
export const googleLogin = async () => {
  await signInWithPopup(auth, googleProvider);
};

// RESET PASSWORD
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  alert("Password reset email sent!");
};
