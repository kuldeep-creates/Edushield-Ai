const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, writeBatch, collection, getDocs, deleteDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Firebase config from .env.local
const firebaseConfig = {
    apiKey: "AIzaSyAwFN6fp3lW19-inpYFaeiTvg8L1Uuag1k",
    authDomain: "edushield-32f77.firebaseapp.com",
    projectId: "edushield-32f77",
    storageBucket: "edushield-32f77.firebasestorage.app",
    messagingSenderId: "743735965255",
    appId: "1:743735965255:web:1c81e992bab5553ebf6362"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const STUDENTS_FILE = path.join(__dirname, '../MODEL prep/DATA SETS/edushield_students_master.csv');
const MARKS_FILE = path.join(__dirname, '../MODEL prep/DATA SETS/edushield_student_marks.csv');

async function uploadData() {
    console.log("Starting data upload to Firestore...");

    const students = {};

    // 1. Parse Students
    console.log("Reading students file...");
    await new Promise((resolve, reject) => {
        fs.createReadStream(STUDENTS_FILE)
            .pipe(csv())
            .on('data', (row) => {
                if (row.Student_ID) {
                    students[row.Student_ID] = {
                        studentId: row.Student_ID,
                        name: row.Student_Name,
                        schoolName: row.School_Name,
                        schoolType: row.School_Type,
                        totalExamsInYear: parseInt(row.Total_Exams_In_Year || '0'),
                        class: parseInt(row.Class || '0'),
                        section: row.Section,
                        stream: row.Stream,
                        overallAttendancePct: parseFloat(row.Overall_Attendance_Pct || '0'),
                        maxAbsentStreakLength: parseInt(row.Max_Absent_Streak_Length || '0'),
                        totalDaysAbsent: parseInt(row.Total_Days_Absent || '0'),
                        subjects: {} // Will hold marks
                    };
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`Loaded ${Object.keys(students).length} students.`);

    // 2. Parse Marks and attach to students
    console.log("Reading marks file...");
    let marksCount = 0;
    await new Promise((resolve, reject) => {
        fs.createReadStream(MARKS_FILE)
            .pipe(csv())
            .on('data', (row) => {
                const sid = row.Student_ID;
                if (sid && students[sid]) {
                    students[sid].subjects[row.Subject_Name] = {
                        exam1: parseFloat(row.Exam_1 || '0'),
                        exam2: parseFloat(row.Exam_2 || '0'),
                        exam3: parseFloat(row.Exam_3 || '0'),
                        exam4: parseFloat(row.Exam_4 || '0'),
                        exam5: parseFloat(row.Exam_5 || '0'),
                        exam6: parseFloat(row.Exam_6 || '0'),
                        latestScore: parseFloat(row.Latest_Score || '0'),
                        scoreMomentum: parseFloat(row.Score_Momentum || '0'),
                        subjectAtRisk: parseInt(row.Subject_At_Risk || '0')
                    };
                    marksCount++;
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`Attached ${marksCount} subject records.`);

    // 3. Upload to Firestore mapping
    // To limit API usage in this demo and make it fast, we'll only upload the first 50 students
    // Or we will upload all 4502 students in batches of 500
    const studentKeys = Object.keys(students);
    const UPLOAD_LIMIT = Object.keys(students).length; // Upload all students!
    console.log(`Uploading first ${UPLOAD_LIMIT} students to Firestore...`);

    let batch = writeBatch(db);
    let count = 0;

    for (let i = 0; i < Math.min(studentKeys.length, UPLOAD_LIMIT); i++) {
        const sid = studentKeys[i];
        const student = students[sid];

        // We put them in a 'demo_students' or 'student_master' collection
        // Let's use 'studentData'
        const docRef = doc(db, 'studentData', sid);
        batch.set(docRef, student);

        count++;
        if (count >= 500) {
            await batch.commit();
            console.log(`Committed batch of ${count}...`);
            batch = writeBatch(db);
            count = 0;
        }
    }

    if (count > 0) {
        await batch.commit();
        console.log(`Committed final batch of ${count}...`);
    }

    console.log("Data upload completed successfully!");
    process.exit(0);
}

uploadData().catch(console.error);
