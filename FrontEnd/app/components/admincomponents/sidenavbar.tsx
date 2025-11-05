'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidenavbar.module.css';

import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  MessageSquareText,
  Users,
  MessageCircle,
  UserCog,
  FileText,
  GalleryVertical,
  Layers,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';

const mainNavLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Products', icon: Boxes },
  { href: '/dashboard/orders', label: 'Order Lists', icon: ClipboardList },
];

const pageNavLinks = [
  { href: '/dashboard/testimony', label: 'Testimony', icon: MessageSquareText },
  { href: '/dashboard/partners', label: 'Partners', icon: Users },
  { href: '/dashboard/chat', label: 'Chat', icon: MessageCircle },
  { href: '/dashboard/users', label: 'User & Role', icon: UserCog },
  { href: '/dashboard/blogs', label: 'Blogs', icon: FileText },
  { href: '/dashboard/gallery', label: 'Web gallery', icon: GalleryVertical },
  { href: '/dashboard/hero', label: 'Hero', icon: Layers },
];

export default function Sidenavbar() {
  const pathname = usePathname();

  const renderLink = (link: { href: string; label: string; icon: LucideIcon }) => {
    const { href, label, icon: Icon } = link;
    const isActive = pathname === href;

    const linkClassName = `${styles.navLink} ${isActive ? styles.active : ''}`;

    return (
      <Link key={href} href={href} className={linkClassName}>
        <Icon className={styles.icon} />
        {label}
      </Link>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.scrollWrapper}>
        <nav className={styles.navMenu}>{mainNavLinks.map(renderLink)}</nav>
        <div className={styles.pagesTitleWrapper}>
          <span className={styles.pagesTitle}>Pages</span>
        </div>
        <nav className={`${styles.navMenu} ${styles.pagesNavMenu}`}>
          {pageNavLinks.map(renderLink)}
        </nav>
      </div>
      
      <div className={styles.bottomNav}>
        <nav className={styles.bottomNavMenu}>
          <Link href="/dashboard/settings" className={styles.navLink}>
            <Settings className={styles.icon} />
            Settings
          </Link>
          <Link href="#" className={`${styles.navLink} ${styles.logoutLink}`}>
            <LogOut className={styles.icon} />
            Logout
          </Link>
        </nav>
      </div>
    </aside>
  );
}