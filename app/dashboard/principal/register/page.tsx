'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '@/lib/firebase';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import DashboardNav from '@/components/DashboardNav';
import styles from '../page.module.css';

type RegisterRole = 'student' | 'teacher';

export default function RegisterUserPage() {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const [principalSchool, setPrincipalSchool] = useState('');
    const [principalUid, setPrincipalUid] = useState('');
    const [registerRole, setRegisterRole] = useState<RegisterRole>('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Shared fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('User@2026');

    // Student-only fields
    const [regNo, setRegNo] = useState('');
    const [grade, setGrade] = useState('');
    const [section, setSection] = useState('');
    const [parentEmail, setParentEmail] = useState('');

    // Teacher-only fields
    const [subject, setSubject] = useState('');
    const [assignedClasses, setAssignedClasses] = useState<string[]>([]);
    const [qualification, setQualification] = useState('');
    const [mobile, setMobile] = useState('');

    const GRADES = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
    const SECTIONS = ['A', 'B', 'C', 'D'];
    const ALL_CLASSES = GRADES.flatMap(g => SECTIONS.map(s => `${g}-${s}`));

    const toggleClass = (cls: string) => {
        setAssignedClasses(prev =>
            prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
        );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }
            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists()) {
                    const data = snap.data();
                    if (data.role !== 'principal') {
                        router.push(`/dashboard/${data.role}`); return;
                    }
                    setPrincipalSchool(data.school || '');
                    setPrincipalUid(user.uid);
                }
            } catch { /* offline — principal stays */ }
            setPageLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const resetForm = () => {
        setName(''); setEmail(''); setPassword('User@2026');
        setRegNo(''); setGrade(''); setSection(''); setParentEmail('');
        setSubject(''); setAssignedClasses([]); setQualification(''); setMobile('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Secondary app so principal stays logged in
            const secondaryApp = initializeApp(firebaseConfig, 'PrincipalRegApp_' + Date.now());
            const secondaryAuth = getAuth(secondaryApp);

            const cred = await createUserWithEmailAndPassword(secondaryAuth, email.trim(), password);
            const newUid = cred.user.uid;

            const basePayload: Record<string, any> = {
                uid: newUid,
                name: name.trim(),
                email: email.toLowerCase().trim(),
                role: registerRole,
                school: principalSchool,
                createdAt: new Date().toISOString(),
                createdBy: principalUid,
            };

            if (registerRole === 'student') {
                Object.assign(basePayload, {
                    regNo: regNo.trim(),
                    grade,
                    section,
                    parentEmail: parentEmail.trim(),
                });
            } else {
                if (assignedClasses.length === 0) {
                    setError('Please assign at least one class to the teacher.');
                    setLoading(false);
                    return;
                }
                Object.assign(basePayload, {
                    subject: subject.trim(),
                    assignedClasses,
                    qualification: qualification.trim(),
                    mobile: mobile.trim(),
                });
            }

            try {
                await setDoc(doc(db, 'users', newUid), basePayload);
            } catch {
                await cred.user.delete();
                throw new Error('Failed to save profile. Auth account rolled back. Check your connection.');
            }

            await deleteApp(secondaryApp);
            setSuccess(`✓ ${registerRole === 'student' ? 'Student' : 'Teacher'} "${name}" registered successfully at ${principalSchool}!`);
            resetForm();

        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Use a different email address.');
            } else {
                setError(err.message || `Failed to register ${registerRole}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #e2e8f0', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin{100%{transform:rotate(360deg)}}`}</style>
        </div>
    );

    const inputStyle: React.CSSProperties = {
        width: '100%', padding: '0.65rem 0.9rem', borderRadius: '0.5rem',
        border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none',
        backgroundColor: '#fff', boxSizing: 'border-box', fontFamily: 'inherit',
        transition: 'border-color 0.2s',
    };
    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: '0.78rem', fontWeight: 700,
        color: '#475569', marginBottom: '0.35rem', letterSpacing: '0.02em',
    };
    const gridTwo: React.CSSProperties = {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem',
    };

    return (
        <div className={styles.container}>
            <DashboardNav role="principal" searchPlaceholder="Search users..." />

            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleBlock}>
                        <h1 className={styles.pageTitle}>Register User</h1>
                        <p className={styles.pageSubtitle}>Add students or teachers directly to your school.</p>
                    </div>
                </div>

                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    {/* School Banner */}
                    <div style={{ backgroundColor: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '0.75rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: '1.5rem' }}>school</span>
                        <div>
                            <p style={{ fontWeight: 700, color: '#16a34a', margin: 0, fontSize: '0.9rem' }}>School Auto-Assigned</p>
                            <p style={{ color: '#15803d', margin: 0, fontSize: '0.825rem' }}>
                                {principalSchool
                                    ? `All registrations will be linked to: ${principalSchool}`
                                    : 'No school linked to your account. Contact admin.'}
                            </p>
                        </div>
                    </div>

                    {/* Role Toggle */}
                    <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '0.75rem', padding: '0.25rem', marginBottom: '1.5rem', gap: '0.25rem' }}>
                        {(['student', 'teacher'] as RegisterRole[]).map(r => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => { setRegisterRole(r); setError(''); setSuccess(''); }}
                                style={{
                                    flex: 1, padding: '0.75rem', borderRadius: '0.625rem', border: 'none',
                                    fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
                                    backgroundColor: registerRole === r ? '#fff' : 'transparent',
                                    color: registerRole === r ? (r === 'student' ? '#3b82f6' : '#10b981') : '#94a3b8',
                                    boxShadow: registerRole === r ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                                    {r === 'student' ? 'school' : 'person_book'}
                                </span>
                                Register {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Error / Success */}
                    {error && <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                    {success && <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>{success}</div>}

                    {/* Form Card */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: registerRole === 'student' ? '#dbeafe' : '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="material-symbols-outlined" style={{ color: registerRole === 'student' ? '#3b82f6' : '#10b981' }}>
                                    {registerRole === 'student' ? 'school' : 'person_book'}
                                </span>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1rem', fontWeight: 700 }}>
                                    {registerRole === 'student' ? 'Student Registration' : 'Teacher Registration'}
                                </h3>
                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>
                                    {registerRole === 'student' ? 'Fill in student academic details' : 'Fill in teacher professional details'}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* ── Shared Fields ── */}
                            <div style={gridTwo}>
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                                        placeholder={registerRole === 'student' ? 'e.g. Ravi Kumar' : 'e.g. Mrs. Priya Sharma'} required />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address *</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
                                        placeholder={registerRole === 'student' ? 'student@example.com' : 'teacher@school.edu'} required />
                                </div>
                            </div>

                            {/* ── Student Fields ── */}
                            {registerRole === 'student' && (<>
                                <div style={gridTwo}>
                                    <div>
                                        <label style={labelStyle}>Registration Number *</label>
                                        <input value={regNo} onChange={e => setRegNo(e.target.value)} style={inputStyle} placeholder="e.g. STU2025001" required />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Parent / Guardian Email</label>
                                        <input type="email" value={parentEmail} onChange={e => setParentEmail(e.target.value)} style={inputStyle} placeholder="parent@example.com" />
                                    </div>
                                </div>
                                <div style={gridTwo}>
                                    <div>
                                        <label style={labelStyle}>Grade / Class *</label>
                                        <select value={grade} onChange={e => setGrade(e.target.value)} style={inputStyle} required>
                                            <option value="">— Select Grade —</option>
                                            {['6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(g => <option key={g} value={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Section</label>
                                        <select value={section} onChange={e => setSection(e.target.value)} style={inputStyle}>
                                            <option value="">— Select Section —</option>
                                            {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>Section {s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </>)}

                            {/* ── Teacher Fields ── */}
                            {registerRole === 'teacher' && (<>
                                <div style={gridTwo}>
                                    <div>
                                        <label style={labelStyle}>Primary Subject *</label>
                                        <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle} required>
                                            <option value="">— Select Subject —</option>
                                            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science', 'Economics', 'Hindi'].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Qualification</label>
                                        <input value={qualification} onChange={e => setQualification(e.target.value)} style={inputStyle} placeholder="e.g. B.Ed, M.Sc Mathematics" />
                                    </div>
                                </div>

                                {/* Multi-class assignment */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <label style={labelStyle}>Assigned Classes * <span style={{ color: '#94a3b8', fontWeight: 400 }}>({assignedClasses.length} selected)</span></label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button type="button" onClick={() => setAssignedClasses([...ALL_CLASSES])}
                                                style={{ fontSize: '0.72rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Select All</button>
                                            <span style={{ color: '#e2e8f0' }}>|</span>
                                            <button type="button" onClick={() => setAssignedClasses([])}
                                                style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>Clear</button>
                                        </div>
                                    </div>
                                    <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '0.625rem', padding: '0.75rem', backgroundColor: '#f8fafc' }}>
                                        {GRADES.map(g => (
                                            <div key={g} style={{ marginBottom: '0.5rem' }}>
                                                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', margin: '0 0 0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g} Grade</p>
                                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    {SECTIONS.map(s => {
                                                        const cls = `${g}-${s}`;
                                                        const checked = assignedClasses.includes(cls);
                                                        return (
                                                            <button
                                                                key={cls}
                                                                type="button"
                                                                onClick={() => toggleClass(cls)}
                                                                style={{
                                                                    padding: '0.3rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.8rem',
                                                                    fontWeight: 700, cursor: 'pointer', border: '1.5px solid',
                                                                    borderColor: checked ? '#3b82f6' : '#e2e8f0',
                                                                    backgroundColor: checked ? '#dbeafe' : '#fff',
                                                                    color: checked ? '#1d4ed8' : '#94a3b8',
                                                                    transition: 'all 0.15s',
                                                                }}
                                                            >
                                                                {checked && '✓ '}{g} {s}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {assignedClasses.length > 0 && (
                                        <p style={{ fontSize: '0.72rem', color: '#3b82f6', marginTop: '0.35rem', fontWeight: 600 }}>
                                            Selected: {assignedClasses.join(', ')}
                                        </p>
                                    )}
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={labelStyle}>Mobile Number</label>
                                    <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} style={inputStyle} placeholder="e.g. +91 9876543210" />
                                </div>
                            </>)}

                            {/* Password */}
                            <div style={{ marginBottom: '0.5rem' }}>
                                <label style={labelStyle}>Initial Password *</label>
                                <input type="text" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle}
                                    placeholder="Min. 6 characters" required minLength={6} />
                                <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '0.35rem 0 0' }}>
                                    The {registerRole} will use this to log in for the first time.
                                </p>
                            </div>

                            {/* School (readonly) */}
                            <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', padding: '0.75rem 1rem', border: '1px dashed #cbd5e1', margin: '1rem 0 1.5rem' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Auto-Assigned School</span>
                                <p style={{ margin: '0.2rem 0 0', fontWeight: 600, color: '#1e293b' }}>{principalSchool || 'Not configured'}</p>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" onClick={() => router.push('/dashboard/principal')}
                                    style={{ flex: 1, padding: '0.75rem', borderRadius: '0.625rem', border: '1.5px solid #e2e8f0', backgroundColor: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading || !principalSchool}
                                    style={{
                                        flex: 2, padding: '0.75rem', borderRadius: '0.625rem', border: 'none',
                                        backgroundColor: loading ? '#86efac' : registerRole === 'student' ? '#3b82f6' : '#10b981',
                                        color: '#fff', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                                        fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        opacity: !principalSchool ? 0.6 : 1,
                                    }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>person_add</span>
                                    {loading
                                        ? `Registering ${registerRole}...`
                                        : `Register ${registerRole === 'student' ? 'Student' : 'Teacher'}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
