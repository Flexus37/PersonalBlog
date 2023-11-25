// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGiiyfpGKmXm_dW1-ygvLa87IFgyzsCZs",
  authDomain: "personalblogflexus37.firebaseapp.com",
  projectId: "personalblogflexus37",
  storageBucket: "personalblogflexus37.appspot.com",
  messagingSenderId: "1044925848719",
  appId: "1:1044925848719:web:9407fcc55ee133e460a4fa",
  measurementId: "G-5D5DQSRPSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

// export { app, db, collection, getDocs, getAuth}