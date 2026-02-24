'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';

export default function ActivatePage() {
    const [showPassword, setShowPassword] = useState(false);

    // Form state
    const [school, setSchool] = useState('');
    const [role, setRole] = useState('student');
    const [regNo, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Auth state
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault();

        const isStudent = role === 'student';
        const isParent = role === 'parent';

        if (!school || !email || !password) {
            setError('Please fill in all details.');
            return;
        }
        if ((isStudent || isParent) && !regNo) {
            setError(isParent ? 'Parents must provide their child\'s Registration No.' : 'Students must provide their Registration No. / Student ID.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Students use synthesized regNo email; other roles use their real email for Firebase Auth
            const isStudent = role === 'student';
            const authEmail = isStudent
                ? `${regNo.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}@edushield.ai`
                : email.trim().toLowerCase();

            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, authEmail, password);
            const user = userCredential.user;

            // Save user profile metadata in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                school,
                role,
                ...(role === 'student' ? { regNo: regNo.trim() } : {}),
                ...(role === 'parent' ? { childRegNo: regNo.trim() } : {}),
                email: email.trim().toLowerCase(),
                authEmail,
                createdAt: new Date().toISOString()
            });

            // Route to role-specific dashboard
            router.push(`/dashboard/${role}`);
        } catch (err: any) {
            console.error('Activation Error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This Registration No. is already activated. Please go to Login.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to activate account. ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
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
            RIGHT PANEL — Activation Form
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
                                    <span className="material-symbols-outlined">person_add</span>
                                </div>
                                <h2 className={styles.formTitle}>Activate Account</h2>
                                <p className={styles.formSubtitle}>Link your school profile</p>
                            </div>

                            {/* Form */}
                            <form
                                className={styles.form}
                                onSubmit={handleActivate}
                            >

                                {error && (
                                    <div style={{ color: 'var(--critical)', fontSize: '0.8125rem', textAlign: 'center', backgroundColor: '#fee2e2', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                        {error}
                                    </div>
                                )}

                                {/* School / Institution */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>School / Institution</label>
                                    <select
                                        className={styles.inputSleek}
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>— Select your school —</option>
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
                                    <label className={styles.fieldLabel}>Role</label>
                                    <select
                                        className={styles.inputSleek}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="student">STUDENT</option>
                                        <option value="parent">PARENT</option>
                                        <option value="teacher">TEACHER</option>
                                        <option value="principal">PRINCIPAL</option>
                                        <option value="district">DISTRICT ADMIN</option>
                                    </select>
                                </div>

                                {/* Registration No / Student ID — Students and Parents only */}
                                {(role === 'student' || role === 'parent') && (
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>
                                            {role === 'parent' ? "Child's Registration No. / Student ID" : "Registration No. / Student ID"}
                                        </label>
                                        <input
                                            className={styles.inputSleek}
                                            type="text"
                                            placeholder="e.g. STU-2024-4598 or 2024-DEL-4598"
                                            value={regNo}
                                            onChange={(e) => setRegNo(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Personal / Work Email */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Email Address</label>
                                    <input
                                        className={styles.inputSleek}
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Password Setup */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Create Security Password</label>
                                    <div className={styles.passwordWrap}>
                                        <input
                                            className={styles.inputSleek}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Choose a strong password"
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

                                {/* Submit */}
                                <button className={styles.submitBtn} type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                                    <span>{loading ? 'Activating...' : 'Verify & Activate'}</span>
                                    {!loading && (
                                        <span className={`material-symbols-outlined ${styles.submitBtnArrow}`}>
                                            how_to_reg
                                        </span>
                                    )}
                                </button>

                                {/* Login link */}
                                <div className={styles.activatePrompt}>
                                    <span className={styles.activateText}>Already activated?</span>
                                    <a href="/login" className={styles.activateLink}>Log in</a>
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
