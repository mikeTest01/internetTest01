
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TODO: Get from Firebase console",
  authDomain: "TODO: Get from Firebase console",
  projectId: "test01-e3105",
  storageBucket: "TODO: Get from Firebase console",
  messagingSenderId: "TODO: Get from Firebase console",
  appId: "TODO: Get from Firebase console"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
