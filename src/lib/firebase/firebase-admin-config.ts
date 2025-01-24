import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminCredentials = JSON.parse(
  process.env.FIREBASE_ADMIN_CREDENTIALS || "null"
);

const firebaseAdminConfig = {
  credential: cert(firebaseAdminCredentials),
};

export function initFirebaseAdmin() {
  if (!getApps().length) {
    return initializeApp(firebaseAdminConfig);
  }
}
