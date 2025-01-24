import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  indexedDBLocalPersistence,
  initializeAuth,
  RecaptchaVerifier,
} from "firebase/auth";

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "null"
);

function initApp() {
  const alreadyInitialized = !!getApps().length;
  if (!alreadyInitialized && !firebaseConfig) {
    throw new Error(
      "Missing Firebase configuration. Please check your environment variables."
    );
  }
  return alreadyInitialized ? getApp() : initializeApp(firebaseConfig);
}

const app = initApp();

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});

export const googleProvider = new GoogleAuthProvider();
export const recaptchaVerifier = (containerId: string) =>
  new RecaptchaVerifier(auth, containerId, { size: "invisible" });
