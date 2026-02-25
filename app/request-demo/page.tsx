'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RequestDemoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Form state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [schoolDistrict, setSchoolDistrict] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call to backend
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            // Optionally, we could redirect after a delay
            // setTimeout(() => router.push('/'), 3000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className={styles.page}>
                <main className={styles.container}>
                    <div className={styles.successCard}>
                        <div className={styles.successIcon}>
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <h1 className={styles.successTitle}>Thank You!</h1>
                        <p className={styles.successDesc}>
                            Your request has been received. Our team will reach out to you within 24 hours to schedule your personalized demo of EduShield AI.
                        </p>
                        <button className={styles.backBtn} onClick={() => router.push('/')}>
                            Return to Homepage
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Global Back Button */}
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>

                {/* ═══════════════════════════════════════
                    LEFT PANEL — Branding & Benefits
                ═══════════════════════════════════════ */}
                <section className={styles.leftPanel}>
                    <div className={styles.aiPattern} />
                    <div className={styles.glowTop} />
                    <div className={styles.glowBottom} />

                    <div className={styles.leftBrand}>
                        <a href="/" className={styles.brandLink}>
                            <div className={styles.leftBrandIcon}>
                                <span className="material-symbols-outlined">shield</span>
                            </div>
                            <span className={styles.leftBrandName}>EduShield AI</span>
                        </a>
                    </div>

                    <div className={styles.leftHero}>
                        <h1 className={styles.leftTitle}>
                            See EduShield AI in <span className={styles.leftTitleAccent}>Action.</span>
                        </h1>
                        <p className={styles.leftDesc}>
                            Schedule a personalized demo and discover how our platform can help your institution improve student outcomes, increase graduation rates, and empower your educators with actionable insights.
                        </p>

                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">insights</span>
                                </div>
                                <span className={styles.featureText}>Predictive Analytics for At-Risk Students</span>
                            </li>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">groups</span>
                                </div>
                                <span className={styles.featureText}>System-Wide District Analytics</span>
                            </li>
                            <li className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">route</span>
                                </div>
                                <span className={styles.featureText}>Automated Intervention Planning</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* ═══════════════════════════════════════
                    RIGHT PANEL — Demo Form
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

                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Request a Demo</h2>
                                <p className={styles.formSubtitle}>Fill out the form below and we'll be in touch shortly.</p>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.row}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>First Name</label>
                                        <input
                                            className={styles.inputSleek}
                                            type="text"
                                            placeholder="Jane"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Last Name</label>
                                        <input
                                            className={styles.inputSleek}
                                            type="text"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>Work Email</label>
                                    <input
                                        className={styles.inputSleek}
                                        type="email"
                                        placeholder="jane.doe@school.edu"
                                        value={workEmail}
                                        onChange={(e) => setWorkEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>Job Title</label>
                                        <input
                                            className={styles.inputSleek}
                                            type="text"
                                            placeholder="E.g. Principal, Admin"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.fieldLabel}>School / District Name</label>
                                        <input
                                            className={styles.inputSleek}
                                            type="text"
                                            placeholder="Acme District"
                                            value={schoolDistrict}
                                            onChange={(e) => setSchoolDistrict(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.fieldLabel}>How can we help? (Optional)</label>
                                    <textarea
                                        className={`${styles.inputSleek} ${styles.textareaSleek}`}
                                        placeholder="Tell us about your current challenges..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <button className={styles.submitBtn} type="submit" disabled={loading}>
                                    <span>{loading ? 'Submitting...' : 'Request Demo'}</span>
                                    {!loading && (
                                        <span className={`material-symbols-outlined ${styles.submitBtnArrow}`}>
                                            calendar_month
                                        </span>
                                    )}
                                </button>

                                <p className={styles.termsText}>
                                    By submitting this form, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
