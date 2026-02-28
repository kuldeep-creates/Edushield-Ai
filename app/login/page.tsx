'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
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

    const redirectToDashboard = async (uid: string, retryCount = 0) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));

            if (userDoc.exists()) {
                const data = userDoc.data();
                // ✅ Credentials already verified by Firebase Auth.
                // Just get the role and redirect — no extra school block.
                sessionStorage.setItem('userRole', data.role || 'student');
                router.push(`/dashboard/${data.role || 'student'}`);
            } else {
                // No Firestore profile — fall back using form role
                const fallbackRole = role === 'other' ? 'dev' : role;
                sessionStorage.setItem('userRole', fallbackRole);
                router.push(`/dashboard/${fallbackRole}`);
            }
        } catch (err: any) {
            if (err.code === 'unavailable' && retryCount < 2) {
                // Firestore offline — retry once after 1.5s
                setTimeout(() => redirectToDashboard(uid, retryCount + 1), 1500);
            } else {
                // Give up — route using form role ('other' = dev)
                const fallbackRole = role === 'other' ? 'dev' : role;
                sessionStorage.setItem('userRole', fallbackRole);
                router.push(`/dashboard/${fallbackRole}`);
            }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (role !== 'other' && !school) {
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

            if (role === 'student' && studentLoginMode === 'id') {
                // Student ID mode — find student's email by regNo, then authenticate
                try {
                    const snap = await getDocs(
                        query(collection(db, 'users'), where('regNo', '==', identifier.trim()))
                    );
                    const matched = snap.docs.filter(d => d.data().school === school);

                    if (matched.length === 0) {
                        setError(`No student found with ID "${identifier.trim()}" at "${school}". Check your Student ID and school.`);
                        setLoading(false);
                        return;
                    }

                    authEmail = matched[0].data().email;
                    if (!authEmail) {
                        setError('Account email not found. Please contact your school administrator.');
                        setLoading(false);
                        return;
                    }
                } catch (err: any) {
                    setError('Lookup failed: ' + (err.message || 'Check your connection.'));
                    setLoading(false);
                    return;
                }
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
        if (role !== 'other' && !school) {
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

    // Derived: is the current user logging in as a student?
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
                                {role !== 'other' && (
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
                                )}

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
                                        <option value="other">OTHER</option>
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
                                    className={styles.googleBtn}
                                    style={{ opacity: googleLoading ? 0.7 : 1 }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                                        <path d="M3.964 10.712A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.712V4.956H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.044l3.007-2.332z" fill="#FBBC05" />
                                        <path d="M9 3.576c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.956L3.964 7.288C4.672 5.163 6.656 3.576 9 3.576z" fill="#EA4335" />
                                    </svg>
                                    <span>{googleLoading ? 'Signing in...' : 'Continue with Google'}</span>
                                </button>


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
