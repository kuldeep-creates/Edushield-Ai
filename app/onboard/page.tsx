'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '@/lib/firebase';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './page.module.css';

export default function OnboardCustomUser() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [devName, setDevName] = useState('');

    const [targetRole, setTargetRole] = useState('dev');

    // Form fields based on role
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: 'Org@2026',
        empType: '',
        district: '',
        state: '',
        school: '',
        mobile: '',
        schoolAddress: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setIsAuthorized(false);
                setPageLoading(false);
                return;
            }

            // ── Fast path: check sessionStorage cache set at login time ──
            const cachedRole = sessionStorage.getItem('userRole');
            if (cachedRole === 'dev') {
                setIsAuthorized(true);
                setPageLoading(false);
                // Still verify against Firestore in background to update devName
                getDoc(doc(db, 'users', user.uid))
                    .then((snap) => {
                        if (snap.exists()) setDevName(snap.data().name || 'Developer');
                    })
                    .catch(() => { }); // silent fail — already authorized from cache
                return;
            }

            // ── Slow path: fetch from Firestore with retries ──
            const checkRole = async (retries = 3): Promise<void> => {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists() && userDoc.data().role === 'dev') {
                        sessionStorage.setItem('userRole', 'dev');
                        setIsAuthorized(true);
                        setDevName(userDoc.data().name || 'Developer');
                    } else {
                        setIsAuthorized(false);
                    }
                    setPageLoading(false);
                } catch (err: any) {
                    if (retries > 0) {
                        setTimeout(() => checkRole(retries - 1), 1500);
                    } else {
                        setIsAuthorized(false);
                        setPageLoading(false);
                    }
                }
            };

            checkRole();
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Create a secondary app to avoid logging out the current developer admin
            const secondaryAppName = 'SecondaryAuthApp_' + Date.now();
            const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
            const secondaryAuth = getAuth(secondaryApp);

            // 1. Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                secondaryAuth,
                formData.email,
                formData.password
            );

            const newUser = userCredential.user;

            // 2. Map payload dynamically based on role
            let payload: any = {
                uid: newUser.uid,
                email: formData.email.trim().toLowerCase(),
                role: targetRole,
                createdAt: serverTimestamp(),
                createdByApp: 'developer-onboarding',
            };

            if (targetRole === 'dev') {
                payload.name = formData.name || 'Developer';
            } else if (targetRole === 'govt') {
                payload.name = formData.name;
                payload.employmentType = formData.empType;
                payload.district = formData.district;
                payload.state = formData.state;
            } else if (targetRole === 'principal') {
                payload.name = formData.name;
                payload.school = formData.school;
                payload.district = formData.district;
                payload.mobile = formData.mobile;
                payload.schoolAddress = formData.schoolAddress;
            }

            // 3. Save profile in Firestore 'users' collection
            try {
                await setDoc(doc(db, 'users', newUser.uid), payload);
            } catch (firestoreErr: any) {
                // If Firestore save fails, delete the Auth user to prevent a broken account
                await newUser.delete();
                throw new Error('Failed to save profile to database. Auth account rolled back. Check your connection and try again.');
            }

            setSuccess(`Successfully added ${payload.name || payload.email} as ${targetRole.toUpperCase()}.`);

            // Clean up secondary auth so it doesn't leak memory
            await deleteApp(secondaryApp);

            // Clear form
            setFormData({
                name: '',
                email: '',
                password: 'Org@2026',
                empType: '',
                district: '',
                state: '',
                school: '',
                mobile: '',
                schoolAddress: ''
            });

        } catch (err: any) {
            setError(err.message || 'Failed to create user account.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className={styles.container}>
                <p style={{ color: '#475569', fontWeight: 600 }}>Verifying Access Credentials...</p>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className={styles.container}>
                <div className={styles.adminCard} style={{ maxWidth: '400px', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#dc2626' }}>lock</span>
                    <h2 className={styles.title}>Restricted Access</h2>
                    <p className={styles.subtitle} style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                        You must be logged in as a Developer (role == dev) to access this page.
                    </p>
                    <button onClick={() => router.push('/login')} className={styles.submitBtn} style={{ width: '100%' }}>
                        Go to Login
                    </button>
                    <button onClick={() => router.push('/')} className={styles.cancelBtn} style={{ width: '100%', marginTop: '0.75rem', border: 'none' }}>
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.adminCard}>
                <div className={styles.header}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#2563EB' }}>admin_panel_settings</span>
                    <h1 className={styles.title}>Developer Management Console</h1>
                    <p className={styles.subtitle}>Welcome back, {devName}. Provision secure accounts below.</p>
                </div>

                {error && <div className={styles.alertError}>{error}</div>}
                {success && <div className={styles.alertSuccess}>{success}</div>}

                <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>Select Target Role to Provision:</label>
                    <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="dev">Developer (Co-Dev)</option>
                        <option value="govt">Government Employee</option>
                        <option value="principal">School Principal</option>
                    </select>
                </div>

                <form onSubmit={handleCreateUser} className={styles.form}>
                    {(targetRole === 'govt' || targetRole === 'principal' || targetRole === 'dev') && (
                        <div className={styles.grid2}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>{targetRole === 'dev' ? 'Optional Name' : 'Full Name'}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder={targetRole === 'dev' ? 'e.g. Alex (Optional)' : 'e.g. John Doe'}
                                    required={targetRole !== 'dev'}
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Email Address (Auth ID)</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="official@edushield.ai"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.grid2}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Assign Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Min 6 characters"
                                required
                                minLength={6}
                            />
                        </div>

                        {targetRole === 'govt' && (
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Employment Type</label>
                                <input
                                    type="text"
                                    name="empType"
                                    value={formData.empType}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="e.g. State Supervisor, Policy Maker"
                                    required
                                />
                            </div>
                        )}

                        {targetRole === 'principal' && (
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>School Name</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="e.g. Delhi Public School"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    {(targetRole === 'govt' || targetRole === 'principal') && (
                        <div className={styles.grid2}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="e.g. Central District"
                                    required
                                />
                            </div>

                            {targetRole === 'govt' && (
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="e.g. Delhi"
                                        required
                                    />
                                </div>
                            )}

                            {targetRole === 'principal' && (
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Mobile No.</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="e.g. +91 9876543210"
                                        required
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {targetRole === 'principal' && (
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>School Address</label>
                            <input
                                type="text"
                                name="schoolAddress"
                                value={formData.schoolAddress}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Full physical address of the institution"
                                required
                            />
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button type="button" onClick={() => router.push(`/dashboard/dev`)} className={styles.cancelBtn}>
                            Go to Console
                        </button>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? 'Provisioning User...' : `Create ${targetRole.toUpperCase()}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
