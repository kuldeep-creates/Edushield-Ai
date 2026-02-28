'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';

interface UserRecord {
    uid: string;
    name?: string;
    email?: string;
    role?: string;
    school?: string;
    district?: string;
    state?: string;
    employmentType?: string;
    mobile?: string;
    designation?: string;
    createdAt?: any;
}

const ROLE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    dev: { label: 'Developers', color: '#8b5cf6', icon: 'code' },
    govt: { label: 'Government Officials', color: '#0ea5e9', icon: 'account_balance' },
    principal: { label: 'Principals', color: '#10b981', icon: 'school' },
    teacher: { label: 'Teachers', color: '#f59e0b', icon: 'person_book' },
    student: { label: 'Students', color: '#3b82f6', icon: 'groups' },
    parent: { label: 'Parents', color: '#ec4899', icon: 'family_restroom' },
    other: { label: 'Other', color: '#64748b', icon: 'category' },
};

export default function DevDashboardPage() {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<UserRecord[]>([]);
    const [activeSection, setActiveSection] = useState<string>('all');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace('/login');
                return;
            }

            // Fast path via sessionStorage
            const cachedRole = sessionStorage.getItem('userRole');
            if (cachedRole === 'dev') {
                setPageLoading(false);
                fetchAllUsers();
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists() && userDoc.data().role === 'dev') {
                    sessionStorage.setItem('userRole', 'dev');
                    setPageLoading(false);
                    fetchAllUsers();
                } else {
                    router.replace(`/dashboard/${userDoc.data()?.role || 'student'}`);
                }
            } catch {
                router.replace('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchAllUsers = async () => {
        setUsersLoading(true);
        try {
            const snap = await getDocs(collection(db, 'users'));
            const users: UserRecord[] = snap.docs.map((d) => ({ uid: d.id, ...d.data() } as UserRecord));
            setAllUsers(users);
        } catch {
            // Firestore offline — show empty state
        } finally {
            setUsersLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '0.75rem', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Authenticating Developer Access...</p>
            </div>
        );
    }

    const grouped: Record<string, UserRecord[]> = {};
    allUsers.forEach((u) => {
        const r = u.role || 'other';
        if (!grouped[r]) grouped[r] = [];
        grouped[r].push(u);
    });

    const totalUsers = allUsers.length;
    const sections = Object.keys(grouped).sort();
    const displayUsers = activeSection === 'all' ? allUsers : (grouped[activeSection] || []);

    return (
        <div style={{ paddingBottom: '3rem', fontFamily: 'Inter, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
            <DashboardNav role="dev" searchPlaceholder="Search users..." />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Developer Console</h1>
                        <p style={{ color: '#64748b', margin: '0.25rem 0 0' }}>{totalUsers} total registered users across all roles.</p>
                    </div>
                    <button
                        onClick={() => router.push('/onboard')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', backgroundColor: '#8b5cf6', color: 'white', borderRadius: '0.625rem', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>person_add</span>
                        Provision User
                    </button>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {Object.entries(ROLE_CONFIG).map(([roleKey, config]) => (
                        <div
                            key={roleKey}
                            onClick={() => setActiveSection(activeSection === roleKey ? 'all' : roleKey)}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: '0.75rem',
                                padding: '1rem',
                                border: `2px solid ${activeSection === roleKey ? config.color : '#e2e8f0'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeSection === roleKey ? `0 4px 12px ${config.color}30` : '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: config.color }}>{config.icon}</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{config.label}</span>
                            </div>
                            <p style={{ fontSize: '2rem', fontWeight: 800, color: config.color, margin: 0 }}>{(grouped[roleKey] || []).length}</p>
                        </div>
                    ))}
                </div>

                {/* User List */}
                <div style={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    {/* Table Header */}
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>
                            {activeSection === 'all' ? 'All Users' : (ROLE_CONFIG[activeSection]?.label || activeSection)}
                            <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>({displayUsers.length})</span>
                        </h2>
                        {activeSection !== 'all' && (
                            <button onClick={() => setActiveSection('all')} style={{ fontSize: '0.8rem', color: '#8b5cf6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                                Show All
                            </button>
                        )}
                    </div>

                    {usersLoading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                            <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 0.75rem' }} />
                            Loading users from database...
                        </div>
                    ) : displayUsers.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>person_off</span>
                            No users found in this category.
                        </div>
                    ) : (
                        <div>
                            {/* Column Headers */}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1.5fr', gap: '1rem', padding: '0.625rem 1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <span>Name / Email</span>
                                <span>Organization</span>
                                <span>Role</span>
                                <span>Details</span>
                            </div>
                            {displayUsers.map((user, idx) => {
                                const cfg = ROLE_CONFIG[user.role || 'other'] || ROLE_CONFIG.other;
                                return (
                                    <div
                                        key={user.uid}
                                        style={{
                                            display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1.5fr', gap: '1rem',
                                            padding: '1rem 1.5rem', borderBottom: idx < displayUsers.length - 1 ? '1px solid #f1f5f9' : 'none',
                                            alignItems: 'center', transition: 'background 0.15s'
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 600, color: '#1e293b', fontSize: '0.875rem' }}>{user.name || '—'}</p>
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{user.email}</p>
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                                            {user.school || user.district || '—'}
                                        </div>
                                        <div>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: `${cfg.color}15`, color: cfg.color, textTransform: 'uppercase' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>{cfg.icon}</span>
                                                {user.role || 'other'}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {user.employmentType || user.mobile || user.designation || 'N/A'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
