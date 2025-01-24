import { auth, googleProvider } from "@/lib/firebase/firebase-config";
import { useAuthStore } from "@/store/auth-store";
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    useAuthStore.getState().setUser(result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
