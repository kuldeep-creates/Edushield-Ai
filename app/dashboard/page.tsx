'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

/**
 * /dashboard — Smart router page.
 * Reads the logged-in user's Firestore role and redirects them to the correct dashboard.
 * If no user is logged in, redirects back to /login.
 */
export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace('/login');
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const role = userDoc.data().role ?? 'student';
                    router.replace(`/dashboard/${role}`);
                } else {
                    // Firestore doc not found — default to student dashboard
                    router.replace('/dashboard/student');
                }
            } catch {
                router.replace('/dashboard/student');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '0.75rem',
            background: '#f8fafc',
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* Subtle animated loader */}
            <div style={{
                width: '2.5rem',
                height: '2.5rem',
                border: '3px solid #e2e8f0',
                borderTop: '3px solid #2563eb',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                Loading your dashboard…
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
