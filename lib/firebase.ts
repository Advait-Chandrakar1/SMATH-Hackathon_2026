// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);