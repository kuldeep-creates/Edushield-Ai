'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');

    // Auth state
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier || !password) {
            setError('Please enter your credentials.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // If the user inputs a Registration No instead of an email, format it for Firebase
            let authEmail = identifier.trim();
            if (!authEmail.includes('@')) {
                authEmail = `${authEmail.toLowerCase().replace(/[^a-z0-9]/g, '')}@edushield.ai`;
            }

            const userCredential = await signInWithEmailAndPassword(auth, authEmail, password);
            const user = userCredential.user;

            // Fetch role from Firestore to decide which dashboard to redirect to
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const role = userDoc.exists() ? userDoc.data().role : 'student';
            router.push(`/dashboard/${role}`);
        } catch (err) {
            console.error('Login Error:', err);
            const firebaseErr = err as any;
            if (firebaseErr.code === 'auth/invalid-credential' || firebaseErr.code === 'auth/user-not-found' || firebaseErr.code === 'auth/wrong-password') {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Failed to log in. ' + firebaseErr.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            {/* Global Back Button */}
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                {/* ═══════════════════════════════════════
            LEFT PANEL — Branding + Feature list
            ═══════════════════════════════════════ */}
                <section className={styles.leftPanel}>
                    {/* Decorative overlays */}
                    <div className={styles.aiPattern} />
                    <div className={styles.glowTop} />
                    <div className={styles.glowBottom} />

                    {/* Brand */}
                    <div className={styles.leftBrand}>
                        <div className={styles.leftBrandIcon}>
                            <span className="material-symbols-outlined">shield</span>
                        </div>
                        <span className={styles.leftBrandName}>EduShield AI</span>
                    </div>

                    {/* Hero content */}
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

                    {/* Footer tagline */}
                    <div className={styles.leftFooter}>
                        <p className={styles.leftTagline}>
                            Stronger Students. Stronger Schools. Stronger Nation.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
            RIGHT PANEL — Login Form
            ═══════════════════════════════════════ */}
                <section className={styles.rightPanel}>
                    <div className={styles.rightInner}>

                        {/* Mobile-only brand header */}
                        <div className={styles.mobileHeader}>
                            <div className={styles.mobileHeaderIcon}>
                                <span className="material-symbols-outlined">shield</span>
                            </div>
                            <h1 className={styles.mobileHeaderTitle}>EduShield AI</h1>
                        </div>

                        {/* Form card */}
                        <div className={styles.formCard}>

                            {/* Card header */}
                            <div className={styles.formHeader}>
                                <div className={styles.formHeaderIcon}>
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <h2 className={styles.formTitle}>Welcome Back</h2>
                                <p className={styles.formSubtitle}>Secure Institutional Access</p>
                            </div>

                            {/* Form */}
                            <form
                                className={styles.form}
                                onSubmit={handleLogin}
                            >

                                {error && (
                                    <div style={{ color: 'var(--critical)', fontSize: '0.8125rem', textAlign: 'center', backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                        {error}
                                    </div>
                                )}

                                {/* School / Institution — Multi-tenant field */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>School / Institution</label>
                                    <select className={styles.inputSleek}>
                                        <option value="">— Select your school —</option>
                                        <optgroup label="Government Schools">
                                            <option value="gov-delhi-001">Govt. Senior Secondary School, Delhi</option>
                                            <option value="gov-mumbai-001">Govt. High School, Mumbai</option>
                                            <option value="gov-chennai-001">Govt. Model School, Chennai</option>
                                            <option value="gov-kolkata-001">Govt. Multipurpose School, Kolkata</option>
                                        </optgroup>
                                        <optgroup label="Private Schools">
                                            <option value="pvt-dps-001">Delhi Public School Network</option>
                                            <option value="pvt-kv-001">Kendriya Vidyalaya Sangathan</option>
                                            <option value="pvt-navodaya-001">Jawahar Navodaya Vidyalaya</option>
                                        </optgroup>
                                        <optgroup label="Other">
                                            <option value="other">Other Institution</option>
                                        </optgroup>
                                    </select>
                                    <span className={styles.schoolHint}>
                                        Don&apos;t see your school? Contact your district admin.
                                    </span>
                                </div>

                                {/* Access Role */}
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

                                {/* Institutional Email / Reg No */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>
                                        {role === 'student' ? 'Registration No. / Student ID' : 'Email Address'}
                                    </label>
                                    <input
                                        className={styles.inputSleek}
                                        type={role === 'student' ? 'text' : 'email'}
                                        placeholder={role === 'student' ? 'e.g. STU-2024-4598 or 2024-DEL-4598' : 'your@email.com'}
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Security Password</label>
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
                                    <a className={styles.forgotLink} href="#">Forgot Password?</a>
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

                                {/* Activate link */}
                                <div className={styles.activatePrompt}>
                                    <span className={styles.activateText}>Student or Parent?</span>
                                    <a href="/activate" className={styles.activateLink}>Activate Account</a>
                                </div>

                            </form>

                            {/* Security badges */}
                            <div className={styles.securityRow}>
                                <div className={styles.securityBadge}>
                                    <span className="material-symbols-outlined">security</span>
                                    <span className={styles.securityBadgeText}>ISO 27001</span>
                                </div>
                                <div className={styles.securityDivider} />
                                <div className={styles.securityBadge}>
                                    <span className="material-symbols-outlined">lock</span>
                                    <span className={styles.securityBadgeText}>SSL ENCRYPTED</span>
                                </div>

                            </div>

                        </div>

                        {/* Footer links */}
                        <div className={styles.pageFooter}>
                            <a className={styles.pageFooterLink} href="#">Terms of Service</a>
                            <span className={styles.pageFooterDot}>•</span>
                            <a className={styles.pageFooterLink} href="#">Privacy Policy</a>
                            <span className={styles.pageFooterDot}>•</span>
                            <a className={styles.pageFooterLink} href="#">System Status</a>
                        </div>

                    </div>
                </section>

            </main>
        </div>
    );
}
