import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwFN6fp3lW19-inpYFaeiTvg8L1Uuag1k",
    authDomain: "edushield-32f77.firebaseapp.com",
    projectId: "edushield-32f77",
    storageBucket: "edushield-32f77.firebasestorage.app",
    messagingSenderId: "743735965255",
    appId: "1:743735965255:web:1c81e992bab5553ebf6362",
    measurementId: "G-V0LLNN637K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndMakeDev() {
    console.log("Searching Firestore 'users' collection for mrjaaduji@gmail.com...");
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', 'mrjaaduji@gmail.com'));

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        console.log("Result: User NOT FOUND! Are you sure you activated/created an account with this exact email?");
        process.exit(0);
        return;
    }

    for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        console.log(`\nFound User UID: ${docSnap.id}`);
        console.log(`Current Role string: "${data.role}"`);

        if (data.role === 'dev') {
            console.log("Status: The user is ALREADY a developer!");
        } else {
            console.log("Status: The user is NOT a developer. Updating them in database now...");
            await updateDoc(doc(db, 'users', docSnap.id), { role: 'dev' });
            console.log("SUCCESS! User has been forcibly promoted to 'dev'.");
        }
    }

    setTimeout(() => process.exit(0), 1000);
}

checkAndMakeDev();
