'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidenavbar() {
  const pathname = usePathname();
  const renderLink = (link: NavLinkProps) => {
    const { href, label, icon: Icon } = link;
    const isActive = pathname === href;
    const linkClassName = `nav-link d-flex align-items-center gap-2 rounded-3 ${
      isActive ? 'active' : 'text-dark'
    }`;

    return (
      <Link key={href} href={href} className={linkClassName}>
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  return (
    <aside
      className="d-flex flex-column vh-100 bg-white border-end"
      style={{ width: '16rem' }}
    >
      <div className="flex-grow-1 overflow-y-auto">
        <nav className="nav nav-pills flex-column p-3 gap-1">
          {mainNavLinks.map(renderLink)}
        </nav>
        <div className="px-3 pt-2 pb-1">
          <span className="small fw-semibold text-muted text-uppercase">
            Pages
          </span>
        </div>
        <nav className="nav nav-pills flex-column p-3 pt-1 gap-1">
          {pageNavLinks.map(renderLink)}
        </nav>
      </div>
      <div className="mt-auto border-top p-3">
        <nav className="nav nav-pills flex-column gap-1">
          <Link
            href="/dashboard/settings"
            className={`nav-link d-flex align-items-center gap-2 rounded-3 ${
              pathname === '/dashboard/settings' ? 'active' : 'text-dark'
            }`}
          >
            <Settings size={16} />
            Settings
          </Link>
          <Link
            href="#"
            className="nav-link text-danger d-flex align-items-center gap-2 rounded-3"
          >
            <LogOut size={16} />
            Logout
          </Link>
        </nav>
      </div>
    </aside>
  );
}