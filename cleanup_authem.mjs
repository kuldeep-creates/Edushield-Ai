// cleanup_authem.mjs
// Removes the stale `authEmail` field from all student documents in Firestore
// Run: node cleanup_authem.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, deleteField, query, where } from 'firebase/firestore';

const app = initializeApp({
    apiKey: 'AIzaSyAwFN6fp3lW19-inpYFaeiTvg8L1Uuag1k',
    authDomain: 'edushield-32f77.firebaseapp.com',
    projectId: 'edushield-32f77',
});

const db = getFirestore(app);

console.log('🧹 Cleaning up stale authEmail fields from Firestore...\n');

const snap = await getDocs(query(collection(db, 'users'), where('role', '==', 'student')));

let cleaned = 0;
let skipped = 0;

for (const docSnap of snap.docs) {
    const data = docSnap.data();
    if (data.authEmail) {
        await updateDoc(docSnap.ref, { authEmail: deleteField() });
        console.log(`  ✅ Cleaned: ${data.regNo || docSnap.id} (removed authEmail: ${data.authEmail})`);
        cleaned++;
    } else {
        skipped++;
    }
}

console.log(`\n✅ Done! Cleaned ${cleaned} documents, ${skipped} already clean.`);
process.exit(0);
