import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC_SrUfXWh42VWWWwTIBx9OvCXfscIx9xo",
  authDomain: "reefguard-8a342.firebaseapp.com",
  projectId: "reefguard-8a342",
  storageBucket: "reefguard-8a342.firebasestorage.app",
  messagingSenderId: "440491987627",
  appId: "1:440491987627:web:ebf8f989b409ee45f79dee",
  measurementId: "G-QQWYE1QBD8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export analytics if you want
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

// Add Firestore and Auth exports
export const db = getFirestore(app);
export const auth = getAuth(app);
