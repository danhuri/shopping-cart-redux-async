// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMyGMhtRBLCBTTTCOylJyaERQpSoDs0kw",
  authDomain: "shopping-cart-redux-fc427.firebaseapp.com",
  projectId: "shopping-cart-redux-fc427",
  storageBucket: "shopping-cart-redux-fc427.appspot.com",
  messagingSenderId: "758300638736",
  appId: "1:758300638736:web:92fdad26ce3344581c1495"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);