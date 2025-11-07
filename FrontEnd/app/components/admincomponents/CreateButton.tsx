'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';

const formLinks: Record<string, string> = {
  '/dashboard/products': '/dashboard/products/create',
  '/dashboard/orders': '/dashboard/orders/create',
  '/dashboard/testimony': '/dashboard/testimony/create',
  '/dashboard/partners': '/dashboard/partners/create',
  '/dashboard/blogs': '/dashboard/blogs/create',
  '/dashboard/gallery': '/dashboard/gallery/upload',
  '/dashboard/hero': '/dashboard/hero/upload',
};

export default function CreateButton() {
  const pathname = usePathname();
  const href = formLinks[pathname];
  if (!href) {
    return null;
  }

  return (
    <>
      <Link
        href={href}
        className="create-button-custom position-fixed d-flex align-items-center justify-content-center rounded-3 shadow text-decoration-none"
        style={{
          width: '56px',
          height: '56px',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#C0FBFF',
          color: '#005F6B',
          zIndex: 20,
          transition: 'all 0.2s ease', 
        }}
      >
        <Plus size={24} />
      </Link>
      <style jsx>{`
        .create-button-custom:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </>
  );
}