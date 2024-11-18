// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { env } from "./utils";

console.log(import.meta.env);

const firebaseConfig = {
    apiKey: env("VITE_FIREBASE_API_KEY"),
    authDomain: env("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: env("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: env("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: env("VITE_FIREBASE_MESSAGE_SENDER_ID"),
    appId: env("VITE_FIREBASE_APP_ID"),
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

