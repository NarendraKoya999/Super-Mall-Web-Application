import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9I7r2W3iykOc-1YD_AgeFIofXG7cktKU",
  authDomain: "super-mall-fc59e.firebaseapp.com",
  projectId: "super-mall-fc59e",
  storageBucket: "super-mall-fc59e.appspot.com",
  messagingSenderId: "397561772027",
  appId: "1:397561772027:web:bd41fbfc8832901c1efd5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
