import { getApp, getApps, initializeApp } from "firebase/app";
import { clientConfig } from "./config";
import { getAuth } from "firebase/auth";

export const app = getApps().length ? getApp() : initializeApp(clientConfig);
export const auth = getAuth(app);
