
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/*
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
*/
const firebaseConfig = {
  apiKey: "AIzaSyBhcx_af1dRKAR9_2YUqnOvqibpa9UhbeQ",
  authDomain: "test01-e3105.firebaseapp.com",
  projectId: "test01-e3105",
  storageBucket: "test01-e3105.firebasestorage.app",
  messagingSenderId: "634811942871",
  appId: "1:634811942871:web:4323f7f3bb88559501ed92",
  measurementId: "G-NG50J9CN94"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
