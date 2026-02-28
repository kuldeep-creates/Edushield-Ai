'use client';

import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './DashboardNav.module.css';

interface NavLink {
    label: string;
    href: string;
}

interface DashboardNavProps {
    role: 'student' | 'teacher' | 'principal' | 'other' | 'parent' | 'dev';
    userName?: string;
    searchPlaceholder?: string;
}

const roleLinks: Record<string, NavLink[]> = {
    student: [
        { label: 'Dashboard', href: '/dashboard/student' },
        { label: 'My Performance', href: '/dashboard/student/performance' },
        { label: 'AI Action Plan', href: '/dashboard/student/action-plan' },
        { label: 'Teacher Connect', href: '/dashboard/student/chat' },
    ],
    parent: [
        { label: 'Child Dashboard', href: '/dashboard/student' },
        { label: 'Child Performance', href: '/dashboard/student/performance' },
        { label: 'Reports', href: '#' },
    ],
    teacher: [
        { label: 'Dashboard', href: '/dashboard/teacher' },
        { label: 'Students', href: '#' },
        { label: 'Classes', href: '#' },
        { label: 'Reports', href: '#' },
    ],
    principal: [
        { label: 'Overview', href: '/dashboard/principal' },
        { label: 'Class Intelligence', href: '/dashboard/principal/classes' },
        { label: 'Teacher Intelligence', href: '/dashboard/principal/teachers' },
        { label: 'Register Student', href: '/dashboard/principal/register' },
    ],
    other: [
        { label: 'Dashboard', href: '/dashboard/other' },
        { label: 'Policy', href: '#' },
        { label: 'Allocations', href: '#' },
        { label: 'Reports', href: '#' },
        { label: 'Settings', href: '#' },
    ],
    dev: [
        { label: 'Dev Console', href: '/dashboard/dev' },
        { label: 'Provision DB', href: '/onboard' },
        { label: 'System Logs', href: '#' },
    ],
};

export default function DashboardNav({ role, userName, searchPlaceholder = 'Search...' }: DashboardNavProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    const links = roleLinks[role] || roleLinks.student;

    return (
        <nav className={styles.navbar}>
            {/* Brand */}
            <div className={styles.brand}>
                <div className={styles.brandIcon}>
                    <span className="material-symbols-outlined">shield</span>
                </div>
                <span className={styles.brandName}>EduShield AI</span>
            </div>

            {/* Search */}
            <div className={styles.searchWrap}>
                <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
                <input type="text" placeholder={searchPlaceholder} className={styles.searchInput} />
            </div>

            {/* Right Side Controls */}
            <div className={styles.right}>
                {/* Nav Links */}
                <div className={styles.navLinks}>
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ''}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Icons */}
                <div className={styles.iconArea}>
                    <button className={styles.iconBtn} aria-label="Notifications">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className={styles.badge}></span>
                    </button>

                    <div className={styles.dropdownWrap}>
                        <button className={styles.iconBtn} aria-label="Settings" title="Settings">
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>settings</span>
                        </button>
                        <div className={styles.dropdownMenu}>
                            <a href={role === 'dev' ? '/dashboard/dev/account' : '/dashboard/student/account'} className={styles.dropdownItem}>
                                <span className="material-symbols-outlined">person</span> Account Profile
                            </a>
                            <a href={role === 'dev' ? '/dashboard/dev/account#password' : '/dashboard/student/account#password'} className={styles.dropdownItem}>
                                <span className="material-symbols-outlined">lock_reset</span> Reset Password
                            </a>
                            {role !== 'dev' && (
                                <a href="/dashboard/student/preferences" className={styles.dropdownItem}>
                                    <span className="material-symbols-outlined">tune</span> Preferences
                                </a>
                            )}
                            <div className={styles.dropdownDivider}></div>
                            <button onClick={handleLogout} className={styles.logoutBtn} aria-label="Sign Out" title="Sign Out">
                                <span className="material-symbols-outlined">logout</span>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
