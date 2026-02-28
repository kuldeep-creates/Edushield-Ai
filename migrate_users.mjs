// migrate_users.mjs
// Shifts all teachers to a 'teachers' collection and deletes everyone except 'dev' and 'principal' from 'users'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const app = initializeApp({
    apiKey: 'AIzaSyAwFN6fp3lW19-inpYFaeiTvg8L1Uuag1k',
    authDomain: 'edushield-32f77.firebaseapp.com',
    projectId: 'edushield-32f77',
});

const db = getFirestore(app);

async function migrate() {
    console.log('Fetching all users from `users` collection...');
    const usersSnap = await getDocs(collection(db, 'users'));

    let movedTeachers = 0;
    let deletedUsers = 0;
    let keptUsers = 0;

    for (const docSnap of usersSnap.docs) {
        const data = docSnap.data();
        const role = data.role && typeof data.role === 'string' ? data.role.toLowerCase() : '';

        // 1. Shift teachers to a new table (collection: 'teachers')
        if (role === 'teacher') {
            await setDoc(doc(db, 'teachers', docSnap.id), data);
            movedTeachers++;
        }

        // 2. Remove all users except 'dev' and 'principal' (and 'principle' just in case of typo)
        if (role !== 'dev' && role !== 'principal' && role !== 'principle') {
            await deleteDoc(docSnap.ref);
            deletedUsers++;
            console.log(`  🗑️  Deleted: ${docSnap.id} (Role: ${role || 'none'})`);
        } else {
            keptUsers++;
            console.log(`  ✅ Kept: ${docSnap.id} (Role: ${role})`);
        }
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`➡️  Moved ${movedTeachers} teachers to 'teachers' collection.`);
    console.log(`🗑️  Deleted ${deletedUsers} users from 'users' collection.`);
    console.log(`🛡️  Kept ${keptUsers} users in 'users' collection.`);
}

migrate().catch(console.error).finally(() => process.exit(0));
