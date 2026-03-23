import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const menuItemsRef = useRef([]);

    const navLinks = [
        { id: 'top', label: 'HOME' },
        { id: 'skills', label: 'SKILL' },
        { id: 'projects', label: 'PROJECT' },
        { id: 'experience', label: 'EXPERIENCES' },
    ];

    const { contextSafe } = useGSAP({ scope: containerRef });

    const openMenu = contextSafe(() => {
        setIsOpen(true);
        // Show overlay immediately then animate opacity
        gsap.to(overlayRef.current, {
            autoAlpha: 1, // handles both opacity and visibility
            duration: 0.5,
            ease: "power3.out"
        });

        // Stagger list items
        gsap.fromTo(menuItemsRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1 // Short delay so overlay starts appearing first
            }
        );
    });

    const closeMenu = contextSafe(() => {
        // Fade out menu items
        gsap.to(menuItemsRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.in"
        });

        // Fade out overlay
        gsap.to(overlayRef.current, {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power3.inOut",
            delay: 0.1,
            onComplete: () => setIsOpen(false)
        });
    });

    return (
        <div ref={containerRef}>
            {/* Hamburger Button */}
            <button
                className="menu-button"
                onClick={openMenu}
                aria-label="Open Menu"
            >
                <Menu size={32} color="#ffffff" />
            </button>

            {/* Overlay */}
            <div
                ref={overlayRef}
                className="nav-overlay"
                style={{ visibility: 'hidden', opacity: 0 }}
            >
                {/* Close Button Top Center */}
                <button
                    className="close-button"
                    onClick={closeMenu}
                    aria-label="Close Menu"
                >
                    <X size={40} color="#ffffff" />
                </button>

                <div className="menu-container">
                    <ul className="menu-list">
                        {navLinks.map((link, index) => (
                            <li
                                key={link.id}
                                ref={el => menuItemsRef.current[index] = el}
                                className="menu-item"
                            >
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => {
                                        if (link.id === 'top') {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                        closeMenu();
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
