'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from '@/app/dashboard/student/account/page.module.css';

interface DevProfile {
    name: string;
    email: string;
    role: string;
    createdAt?: any;
}

export default function DevAccountPage() {
    const router = useRouter();
    const [profile, setProfile] = useState<DevProfile | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    // Password change state
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [pwdLoading, setPwdLoading] = useState(false);

    // Edit profile state
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState('');
    const [editSaving, setEditSaving] = useState(false);
    const [editMsg, setEditMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }

            // ── Immediate: populate from Firebase Auth so UI never shows dashes ──
            setProfile({
                name: user.displayName || user.email?.split('@')[0] || 'Developer',
                email: user.email || '',
                role: 'dev',
            });
            setIsFetching(false); // Show the page immediately

            // ── Background: try to enrich with Firestore data ──
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.role !== 'dev') {
                        router.push(`/dashboard/${data.role || 'student'}`);
                        return;
                    }
                    setProfile({
                        name: data.name || user.displayName || user.email?.split('@')[0] || 'Developer',
                        email: data.email || user.email || '',
                        role: data.role,
                        createdAt: data.createdAt,
                    });
                }
            } catch {
                // Firestore offline — keep showing Auth data, already set above
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwdMsg(null);
        if (newPwd !== confirmPwd) { setPwdMsg({ type: 'error', text: 'New passwords do not match.' }); return; }
        if (newPwd.length < 6) { setPwdMsg({ type: 'error', text: 'Password must be at least 6 characters.' }); return; }

        setPwdLoading(true);
        try {
            const user = auth.currentUser!;
            const cred = EmailAuthProvider.credential(user.email!, currentPwd);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, newPwd);
            setPwdMsg({ type: 'success', text: 'Password updated successfully! ✓' });
            setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '';
            if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
                setPwdMsg({ type: 'error', text: 'Current password is incorrect.' });
            } else {
                setPwdMsg({ type: 'error', text: 'Failed to update password. Please try again.' });
            }
        } finally {
            setPwdLoading(false);
        }
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName.trim()) { setEditMsg({ type: 'error', text: 'Name cannot be empty.' }); return; }
        setEditSaving(true);
        setEditMsg(null);
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, 'users', user.uid), { name: editName.trim() });
                setProfile(prev => prev ? { ...prev, name: editName.trim() } : prev);
                setEditMsg({ type: 'success', text: 'Profile updated successfully! ✓' });
                setTimeout(() => setEditMode(false), 1200);
            }
        } catch {
            setEditMsg({ type: 'error', text: 'Failed to save. Check your connection.' });
        } finally {
            setEditSaving(false);
        }
    };

    const handleLogout = async () => {
        sessionStorage.removeItem('userRole');
        await signOut(auth);
        router.push('/login');
    };

    const initials = profile?.name
        ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'DV';

    const joinDate = profile?.createdAt?.toDate
        ? profile.createdAt.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
        : profile?.createdAt
            ? new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            : '—';

    if (isFetching) {
        return (
            <div className={styles.loadingWrap}>
                <div className={styles.spinner} />
                <p>Loading developer profile…</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <DashboardNav role="dev" searchPlaceholder="Search..." />

            <main className={styles.main}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Developer Account</h1>
                    <p className={styles.pageSubtitle}>Manage your profile and security settings</p>
                </div>

                <div className={styles.grid}>
                    {/* LEFT: Profile Card */}
                    <div className={styles.sidebar}>
                        <div className={styles.profileCard}>
                            <div className={styles.avatarRing} style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                                <div className={styles.avatar}>{initials}</div>
                            </div>
                            <h2 className={styles.profileName}>{profile?.name || 'Developer'}</h2>
                            <p className={styles.profileRole}>
                                <span className={styles.rolePill} style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6', border: '1px solid #8b5cf640' }}>
                                    <span className="material-symbols-outlined">code</span>
                                    Developer
                                </span>
                            </p>
                            <div className={styles.statsRow}>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Email</span>
                                    <span className={styles.statVal} style={{ fontSize: '0.75rem' }}>{profile?.email}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Joined</span>
                                    <span className={styles.statVal}>{joinDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.quickLinks}>
                            <a href="/dashboard/dev" className={styles.quickLink}>
                                <span className="material-symbols-outlined">terminal</span>
                                Dev Console
                            </a>
                            <a href="/onboard" className={styles.quickLink}>
                                <span className="material-symbols-outlined">person_add</span>
                                Provision Users
                            </a>
                        </div>
                    </div>

                    {/* RIGHT: Settings */}
                    <div className={styles.content}>
                        {/* Profile Info */}
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined">person</span>
                                <h3>Profile Information</h3>
                                <button
                                    onClick={() => { setEditName(profile?.name || ''); setEditMsg(null); setEditMode(true); }}
                                    style={{ marginLeft: 'auto', padding: '0.375rem 0.75rem', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>edit</span> Edit
                                </button>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Full Name</span>
                                    <span className={styles.infoVal}>{profile?.name || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Email Address</span>
                                    <span className={styles.infoVal}>{profile?.email || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Role</span>
                                    <span className={styles.infoVal} style={{ color: '#8b5cf6', fontWeight: 600 }}>Developer</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Account Created</span>
                                    <span className={styles.infoVal}>{joinDate}</span>
                                </div>
                            </div>
                        </section>

                        {/* Change Password */}
                        <section id="password" className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined">lock</span>
                                <h3>Change Password</h3>
                            </div>
                            <form className={styles.pwdForm} onSubmit={handleChangePassword}>
                                {pwdMsg && (
                                    <div className={`${styles.alert} ${styles[pwdMsg.type]}`}>
                                        {pwdMsg.text}
                                    </div>
                                )}
                                <div className={styles.fieldGroup}>
                                    <label>Current Password</label>
                                    <input type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} placeholder="Enter current password" required />
                                </div>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldGroup}>
                                        <label>New Password</label>
                                        <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Min. 6 characters" required />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label>Confirm New Password</label>
                                        <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="Repeat new password" required />
                                    </div>
                                </div>
                                <button type="submit" className={styles.saveBtn} disabled={pwdLoading}>
                                    {pwdLoading ? 'Updating…' : 'Update Password'}
                                </button>
                            </form>
                        </section>

                        {/* Danger Zone */}
                        <section className={`${styles.card} ${styles.dangerCard}`}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>warning</span>
                                <h3 style={{ color: '#ef4444' }}>Danger Zone</h3>
                            </div>
                            <p className={styles.dangerText}>
                                Signing out will end your developer session and clear your access cache.
                            </p>
                            <button className={styles.dangerBtn} onClick={handleLogout}>
                                <span className="material-symbols-outlined">logout</span>
                                Sign Out of EduShield
                            </button>
                        </section>
                    </div>
                </div>
            </main>

            {/* Edit Profile Modal */}
            {editMode && (
                <div className={styles.modalOverlay} onClick={() => setEditMode(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                <span className="material-symbols-outlined">edit</span>
                            </div>
                            <div>
                                <h2 className={styles.modalTitle}>Edit Profile</h2>
                                <p className={styles.modalSubtitle}>Update your developer display name</p>
                            </div>
                            <button className={styles.modalClose} onClick={() => setEditMode(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form className={styles.modalForm} onSubmit={handleSaveProfile}>
                            {editMsg && (
                                <div className={`${styles.alert} ${styles[editMsg.type]}`}>
                                    {editMsg.text}
                                </div>
                            )}
                            <div className={styles.modalAvatar}>
                                <div className={styles.modalAvatarRing} style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                                    <div className={styles.modalAvatarInner}>{initials}</div>
                                </div>
                            </div>
                            <div className={styles.fieldGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Your full name"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditMode(false)}>Cancel</button>
                                <button type="submit" className={styles.saveBtn} disabled={editSaving}>
                                    {editSaving ? 'Saving…' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
