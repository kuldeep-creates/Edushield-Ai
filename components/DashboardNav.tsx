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
    role: 'student' | 'teacher' | 'principal' | 'district' | 'parent';
    userName?: string;
    searchPlaceholder?: string;
}

const roleLinks: Record<string, NavLink[]> = {
    student: [
        { label: 'Dashboard', href: '/dashboard/student' },
        { label: 'My Performance', href: '/dashboard/student/performance' },
        { label: 'AI Action Plan', href: '/dashboard/student/action-plan' },
        { label: 'Schedule Help', href: '#' },
    ],
    parent: [
        { label: 'Dashboard', href: '/dashboard/parent' },
        { label: 'My Child', href: '#' },
        { label: 'Reports', href: '#' },
    ],
    teacher: [
        { label: 'Dashboard', href: '/dashboard/teacher' },
        { label: 'Students', href: '#' },
        { label: 'Classes', href: '#' },
        { label: 'Reports', href: '#' },
    ],
    principal: [
        { label: 'Dashboard', href: '/dashboard/principal' },
        { label: 'Faculty', href: '#' },
        { label: 'Students', href: '#' },
        { label: 'Reports', href: '#' },
        { label: 'Settings', href: '#' },
    ],
    district: [
        { label: 'Dashboard', href: '/dashboard/district' },
        { label: 'Policy', href: '#' },
        { label: 'Allocations', href: '#' },
        { label: 'Reports', href: '#' },
        { label: 'Settings', href: '#' },
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
                            <a href="#" className={styles.dropdownItem}>
                                <span className="material-symbols-outlined">person</span> Account Profile
                            </a>
                            <a href="#" className={styles.dropdownItem}>
                                <span className="material-symbols-outlined">lock_reset</span> Reset Password
                            </a>
                            <a href="#" className={styles.dropdownItem}>
                                <span className="material-symbols-outlined">tune</span> Preferences
                            </a>
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
