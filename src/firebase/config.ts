import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_CB3tx50xtNr1fFndIsu2KDc4nrV0cnU",
  authDomain: "newsapi-7d609.firebaseapp.com",
  projectId: "newsapi-7d609",
  storageBucket: "newsapi-7d609.firebasestorage.app",
  messagingSenderId: "111434927466",
  appId: "1:111434927466:web:279295b4651467c28ae913",
  measurementId: "G-KHS915PSF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };