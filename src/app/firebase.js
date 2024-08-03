// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDjSNaZh8Y4uYk-tnHSRBl-olLvn_ppD4",
  authDomain: "inventory-managment-473af.firebaseapp.com",
  projectId: "inventory-managment-473af",
  storageBucket: "inventory-managment-473af.appspot.com",
  messagingSenderId: "931049416927",
  appId: "1:931049416927:web:7dfbcb086df47bb6eca16a",
  measurementId: "G-QKWZFJF8ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error checking analytics support", error);
  });
}

export { firestore, analytics };