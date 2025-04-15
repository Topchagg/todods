import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjj1ZjZUtPfkBRn1fiAR9uyIKV0NwZWE0",
  authDomain: "todos-962cf.firebaseapp.com",
  projectId: "todos-962cf",
  storageBucket: "todos-962cf.firebasestorage.app",
  messagingSenderId: "1021625500078",
  appId: "1:1021625500078:web:9916580f16861a6aa4083f",
  measurementId: "G-YXKTD4GN0E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authApp = getAuth(app);


export { db,authApp };