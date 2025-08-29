// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "apiKey": "mock-api-key",
  "authDomain": "netgauge-ey99d.firebaseapp.com",
  "projectId": "netgauge-ey99d",
  "storageBucket": "netgauge-ey99d.appspot.com",
  "messagingSenderId": "1005297371052",
  "appId": "1:1005297371052:web:65a50a113a30a7c4636f32",
  "measurementId": "G-50012W39YF"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
