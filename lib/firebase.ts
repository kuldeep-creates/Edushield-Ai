import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwFN6fp3lW19-inpYFaeiTvg8L1Uuag1k",
    authDomain: "edushield-32f77.firebaseapp.com",
    projectId: "edushield-32f77",
    storageBucket: "edushield-32f77.firebasestorage.app",
    messagingSenderId: "743735965255",
    appId: "1:743735965255:web:1c81e992bab5553ebf6362",
    measurementId: "G-V0LLNN637K"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
