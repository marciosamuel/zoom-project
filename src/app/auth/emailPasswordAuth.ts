import { auth } from "@/lib/firebase/firebase-config";
import { useAuthStore } from "@/store/auth-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUpWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error("Error creating user with email and password:", error);
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error("Error signing in with email and password:", error);
  }
};
