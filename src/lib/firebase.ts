// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // gauge key "apiKey": "AIzaSyCDG-m4ZpclOQ8mu6ktr6IbQrh4aoLAXhU",
  // test key
  "apiKey": "AIzaSyBhcx_af1dRKAR9_2YUqnOvqibpa9UhbeQ",
  //"authDomain": "test01-e3105.firebaseapp.com",
  "projectId": "test01-e3105",
  "storageBucket": "test01-e3105.appspot.com",
  "messagingSenderId": "858252199613",
  "appId": "1:858252199613:web:9324b33535359a1e05d9e9",
  "measurementId": "G-L0E6Y3S0M4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
