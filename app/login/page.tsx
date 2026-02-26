'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [school, setSchool] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    // Student login mode: 'id' for Student ID, 'email' for Gmail
    const [studentLoginMode, setStudentLoginMode] = useState<'id' | 'email'>('id');

    // Auth state
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const router = useRouter();

    const redirectToDashboard = async (uid: string) => {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (userDoc.exists()) {
            const data = userDoc.data();

            // Verify school if it exists in the user document
            if (data.school && data.school !== school) {
                setError('Institution verification failed. You do not belong to the selected school.');
                await auth.signOut();
                return;
            }

            router.push(`/dashboard/${data.role || 'student'}`);
        } else {
            router.push(`/dashboard/student`);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!school) {
            setError('Please select your school or institution.');
            return;
        }

        if (!identifier || !password) {
            setError('Please enter your credentials.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let authEmail = identifier.trim();

            // If student logged in with Student ID, synthesize the Firebase email
            if (role === 'student' && studentLoginMode === 'id') {
                authEmail = `${authEmail.toLowerCase().replace(/[^a-z0-9]/g, '')}@edushield.ai`;
            } else if (!authEmail.includes('@')) {
                // Non-student typed without @ — still convert
                authEmail = `${authEmail.toLowerCase().replace(/[^a-z0-9]/g, '')}@edushield.ai`;
            }

            const userCredential = await signInWithEmailAndPassword(auth, authEmail, password);
            await redirectToDashboard(userCredential.user.uid);
        } catch (err) {
            const firebaseErr = err as any;
            if (
                firebaseErr.code === 'auth/invalid-credential' ||
                firebaseErr.code === 'auth/user-not-found' ||
                firebaseErr.code === 'auth/wrong-password'
            ) {
                setError('Invalid credentials. Please check your details and try again.');
            } else {
                setError('Failed to log in. ' + firebaseErr.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!school) {
            setError('Please select your school or institution before signing in.');
            return;
        }

        setGoogleLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await redirectToDashboard(result.user.uid);
        } catch (err) {
            const firebaseErr = err as any;
            if (firebaseErr.code === 'auth/popup-closed-by-user') {
                setError('Sign-in popup was closed. Please try again.');
            } else {
                setError('Google sign-in failed. ' + firebaseErr.message);
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    const isStudent = role === 'student';

    return (
        <div className={styles.page}>
            {/* Global Back Button */}
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>

                {/* LEFT PANEL */}
                <section className={styles.leftPanel}>
                    <div className={styles.aiPattern} />
                    <div className={styles.glowTop} />
                    <div className={styles.glowBottom} />

                    <div className={styles.leftBrand}>
                        <div className={styles.leftBrandIcon}>
                            <span className="material-symbols-outlined">shield</span>
                        </div>
                        <span className={styles.leftBrandName}>EduShield AI</span>
                    </div>

                    <div className={styles.leftHero}>
                        <h1 className={styles.leftTitle}>
                            Prevent Academic Failure{' '}
                            <span className={styles.leftTitleAccent}>Before It Happens.</span>
                        </h1>
                        <p className={styles.leftDesc}>
                            EduShield AI empowers schools with early risk detection and smart
                            intervention tools to reduce dropouts and strengthen the education system.
                        </p>

                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <span className={styles.featureText}>AI-Based Risk Prediction</span>
                            </li>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">monitoring</span>
                                </div>
                                <span className={styles.featureText}>Real-Time Student Monitoring</span>
                            </li>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">insights</span>
                                </div>
                                <span className={styles.featureText}>Data-Driven Intervention Support</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.leftFooter}>
                        <p className={styles.leftTagline}>
                            Stronger Students. Stronger Schools. Stronger Nation.
                        </p>
                    </div>
                </section>

                {/* RIGHT PANEL */}
                <section className={styles.rightPanel}>
                    <div className={styles.rightInner}>

                        <div className={styles.mobileHeader}>
                            <div className={styles.mobileHeaderIcon}>
                                <span className="material-symbols-outlined">shield</span>
                            </div>
                            <h1 className={styles.mobileHeaderTitle}>EduShield AI</h1>
                        </div>

                        <div className={styles.formCard}>

                            <div className={styles.formHeader}>
                                <div className={styles.formHeaderIcon}>
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <h2 className={styles.formTitle}>Welcome Back</h2>
                                <p className={styles.formSubtitle}>Secure Institutional Access</p>
                            </div>

                            <form className={styles.form} onSubmit={handleLogin}>

                                {error && (
                                    <div style={{ color: '#dc2626', fontSize: '0.8125rem', textAlign: 'center', backgroundColor: '#fee2e2', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
                                        {error}
                                    </div>
                                )}

                                {/* School */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>School / Institution</label>
                                    <select
                                        className={styles.inputSleek}
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        required
                                    >
                                        <option value="">— Select your school —</option>
                                        <option value="Delhi Public School">Delhi Public School</option>
                                        <option value="Kendriya Vidyalaya">Kendriya Vidyalaya</option>
                                        <option value="City International">City International</option>
                                        <option value="Saraswati Vidya Mandir">Saraswati Vidya Mandir</option>
                                        <option value="Zilla Parishad High">Zilla Parishad High</option>
                                    </select>
                                </div>

                                {/* Role */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Access Role</label>
                                    <select
                                        className={styles.inputSleek}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="student">STUDENT</option>
                                        <option value="parent">PARENT</option>
                                        <option value="teacher">TEACHER</option>
                                        <option value="principal">PRINCIPAL</option>
                                        <option value="district">DISTRICT ADMIN</option>
                                    </select>
                                </div>

                                {/* Student login mode toggle */}
                                {isStudent && (
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Sign in using</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem', backgroundColor: '#f1f5f9', borderRadius: '0.625rem', border: '1px solid #e2e8f0' }}>
                                            <button
                                                type="button"
                                                onClick={() => { setStudentLoginMode('id'); setIdentifier(''); }}
                                                style={{
                                                    flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, transition: 'all 0.2s',
                                                    backgroundColor: studentLoginMode === 'id' ? '#ffffff' : 'transparent',
                                                    color: studentLoginMode === 'id' ? '#1e3a8a' : '#64748b',
                                                    boxShadow: studentLoginMode === 'id' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                                }}
                                            >
                                                🪪 Student ID
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setStudentLoginMode('email'); setIdentifier(''); }}
                                                style={{
                                                    flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, transition: 'all 0.2s',
                                                    backgroundColor: studentLoginMode === 'email' ? '#ffffff' : 'transparent',
                                                    color: studentLoginMode === 'email' ? '#1e3a8a' : '#64748b',
                                                    boxShadow: studentLoginMode === 'email' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                                }}
                                            >
                                                ✉️ Email / Gmail
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Identifier field — changes based on mode */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>
                                        {isStudent && studentLoginMode === 'id'
                                            ? 'Student ID / Registration No.'
                                            : 'Email Address'}
                                    </label>
                                    <input
                                        className={styles.inputSleek}
                                        type={isStudent && studentLoginMode === 'id' ? 'text' : 'email'}
                                        placeholder={isStudent && studentLoginMode === 'id' ? 'e.g. STU-2024-4598' : 'your@email.com'}
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                        autoComplete={isStudent && studentLoginMode === 'id' ? 'off' : 'email'}
                                    />
                                </div>

                                {/* Password */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Password</label>
                                    <div className={styles.passwordWrap}>
                                        <input
                                            className={styles.inputSleek}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{ paddingRight: '3rem' }}
                                        />
                                        <button
                                            className={styles.passwordToggle}
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            <span className="material-symbols-outlined">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Remember + Forgot */}
                                <div className={styles.rememberRow}>
                                    <label className={styles.rememberLabel}>
                                        <input type="checkbox" />
                                        <span className={styles.rememberText}>Remember device</span>
                                    </label>
                                    <a className={styles.forgotLink} href="/contact">Forgot Password?</a>
                                </div>

                                {/* Submit */}
                                <button className={styles.submitBtn} type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                                    <span>{loading ? 'Authenticating...' : 'Login Securely'}</span>
                                    {!loading && (
                                        <span className={`material-symbols-outlined ${styles.submitBtnArrow}`}>
                                            arrow_forward
                                        </span>
                                    )}
                                </button>

                                {/* Divider */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
                                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>OR</span>
                                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                                </div>

                                {/* Google Sign-In */}
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={googleLoading}
                                    style={{
                                        width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                                        fontSize: '0.9375rem', fontWeight: 600, color: '#374151', transition: 'all 0.2s',
                                        opacity: googleLoading ? 0.7 : 1,
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                                        <path d="M43.6 20.5H42V20H24v8h11.3C33.6 33 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.8 29.3 4.8 24 4.8 12.9 4.8 4 13.7 4 24.8s8.9 20 20 20c11 0 19.4-7.7 19.4-19.6 0-1.3-.1-2.6-.4-3.7z" fill="#FFC107" />
                                        <path d="M6.3 14.7l6.6 4.8C14.6 15.9 19 12.8 24 12.8c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.8 29.3 4.8 24 4.8c-7.6 0-14.2 4.2-17.7 9.9z" fill="#FF3D00" />
                                        <path d="M24 44.8c5.2 0 9.8-1.9 13.4-5L31 35.2C29.1 36.7 26.7 37.6 24 37.6c-5.2 0-9.5-3-11.3-7.3l-6.6 5.1C9.6 40.7 16.3 44.8 24 44.8z" fill="#4CAF50" />
                                        <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.5 5.8l6.4 4.7C40.4 35.9 44 30.8 44 24.8c0-1.3-.1-2.6-.4-3.7z" fill="#1976D2" />
                                    </svg>
                                    {googleLoading ? 'Signing in...' : 'Continue with Google'}
                                </button>

                                {/* Activate link */}
                                <div className={styles.activatePrompt}>
                                    <span className={styles.activateText}>New to EduShield?</span>
                                    <a href="/activate" className={styles.activateLink}>Activate Account</a>
                                </div>

                            </form>

                        </div>

                        {/* Footer links */}
                        <div className={styles.pageFooter}>
                            <a className={styles.pageFooterLink} href="/terms">Terms of Service</a>
                            <span className={styles.pageFooterDot}>•</span>
                            <a className={styles.pageFooterLink} href="/security">Privacy Policy</a>
                            <span className={styles.pageFooterDot}>•</span>
                            <a className={styles.pageFooterLink} href="/contact">Support</a>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
}
