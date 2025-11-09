'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PersonCircle } from 'react-bootstrap-icons';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    const navbarStyle = {
        maxWidth: '1400px',
        zIndex: 9999,
        backgroundColor: 'transparent', 
        backdropFilter: 'none', 
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease', 
    };

    const linkColor = scrolled ? 'text-white' : 'text-dark';
    const iconColor = scrolled ? 'white' : 'black';
    const buttonVariant = scrolled ? 'btn-light' : 'btn-primary';
    const buttonTextColor = scrolled ? 'black' : 'white';
    
    const logoBorderColor = scrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 123, 255, 0.7)';
    
    const navUlStyle = {
        backgroundColor: scrolled ? 'rgba(22, 39, 55, 0.95)' : 'rgba(255, 255, 255, 0.77)', 
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderRadius: '30px',
        marginLeft: '-80px',
        padding: '10px 20px 10px 100px',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    };
    
    const navLinks = [
        { href: '/#home', label: 'Beranda' },
        { href: '/#about', label: 'Tentang Kami' },
        { href: '/#products', label: 'Produk' },
        { href: '/#testimonies', label: 'Testimoni' },
        { href: '/#blogs', label: 'Blogs' },
        { href: '/#gallery', label: 'Gallery' },
    ];

    return (
        <nav
            className="navbar navbar-expand-lg rounded-pill px-5 py-0 position-fixed top-0 start-50 translate-middle-x mt-3 d-none d-lg-flex"
            style={navbarStyle}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                
                <Link
                    href="/"
                    className="navbar-brand d-flex align-items-center"
                    style={{
                        marginLeft: '-20px',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#ffff',
                            borderRadius: '50%',
                            border: `3px solid ${logoBorderColor}`,
                            padding: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            transition: 'border-color 0.3s ease',
                        }}
                    >
                        <Image
                            src="/images/logoRS.png"
                            alt="Rajawali Plastik Logo"
                            width={60}
                            height={60}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ zIndex: 10 }}
                >
                    <span className="navbar-toggler-icon" style={{ filter: scrolled ? 'invert(1)' : 'none', transition: 'filter 0.3s ease' }}></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                    style={{
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <ul
                        className="navbar-nav align-items-center gap-3"
                        style={navUlStyle}
                    >
                        {navLinks.map((item) => (
                            <li key={item.href} className="nav-item">
                                <a 
                                    href={item.href} 
                                    className={`nav-link ${linkColor} nav-link-hover`}
                                    style={{ whiteSpace: item.label === 'Tentang Kami' ? 'nowrap' : 'normal', transition: 'color 0.3s ease' }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        
                        <li className="nav-item">
                            <Link
                                href="/chat"
                                className={`btn ${buttonVariant} rounded-pill px-4 d-inline-flex align-items-center justify-content-center fw-bold`}
                                style={{
                                    whiteSpace: 'nowrap',
                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                    color: buttonTextColor,
                                }}
                                >
                                Hubungi Kami!
                            </Link>
                        </li>
                        
                        <li className="nav-item ms-2">
                            <Link 
                                href="/profile" 
                                className={`nav-link fs-4 d-flex align-items-center`}
                                style={{ color: iconColor, transition: 'color 0.3s ease' }}
                            >
                                <PersonCircle />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;