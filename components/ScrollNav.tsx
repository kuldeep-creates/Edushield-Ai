"use client";

import { useEffect, useState } from 'react';

type NavLink = {
    id: string;
    label: string;
    icon: string;
    color: string;
};

export default function ScrollNav({ links, title }: { links: NavLink[], title: string }) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const sections = links.map(link => document.getElementById(link.id));

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            // Find the entry that has the largest intersection ratio
            let maxRatio = 0;
            let currentActiveId = activeId;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    currentActiveId = entry.target.id;
                }
            });

            // If we found a larger ratio, or if the current active is fully out of view, update
            if (maxRatio > 0) {
                setActiveId(currentActiveId);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            // Root margin creates a bounding box. 
            // We care about what is intersecting in the main viewing area (middle 60% of screen)
            rootMargin: '-20% 0px -20% 0px',
            // Threshold creates an array of ratios (e.g. 0.1, 0.2, etc) to fire the callback on.
            // Using multiple thresholds ensures smooth tracking even for very tall sections
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, [links, activeId]);

    // Fallback: set first link active initially
    useEffect(() => {
        if (!activeId && links.length > 0) {
            setActiveId(links[0].id);
        }
    }, [links, activeId]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Need to account for the sticky header (approx 5rem / 80px)
            const yOffset = -100; // Extra offset for spacing above the section
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });

            // Push state so URL hash updates without breaking scroll
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <aside style={{
            position: 'sticky',
            top: '5rem',
            width: '240px',
            height: 'calc(100vh - 5rem)',
            overflowY: 'auto',
            padding: '2rem 0',
            borderRight: '1px solid #e2e8f0',
            display: 'none',
        }} className="desktop-sidebar">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', paddingRight: '1.5rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.05em', paddingLeft: '0.75rem' }}>
                    {title}
                </h3>
                {links.map((link) => {
                    const isActive = activeId === link.id;
                    return (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => handleClick(e, link.id)}
                            style={{
                                color: isActive ? '#0f172a' : '#64748b',
                                textDecoration: 'none',
                                fontWeight: isActive ? 700 : 500,
                                fontSize: '0.9375rem',
                                padding: '0.5rem 0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: isActive ? '#f1f5f9' : 'transparent',
                                borderRadius: '0.5rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{
                                    fontSize: '1.25rem',
                                    color: isActive ? link.color : '#94a3b8',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                {link.icon}
                            </span>
                            {link.label}
                        </a>
                    );
                })}
            </nav>
            <style>{`
                @media (min-width: 768px) {
                    .desktop-sidebar { display: block !important; }
                }
            `}</style>
        </aside>
    );
}
