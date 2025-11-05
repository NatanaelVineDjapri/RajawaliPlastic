'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import styles from './CreateButton.module.css';
import { usePathname } from 'next/navigation';

const formLinks: Record<string, string> = {
  '/dashboard/products': '/dashboard/products/create',
  '/dashboard/orders': '/dashboard/orders/create',
  '/dashboard/testimony': '/dashboard/testimony/create',
  '/dashboard/partners': '/dashboard/partners/create',
  '/dashboard/blogs': '/dashboard/blogs/create',
  '/dashboard/gallery': '/dashboard/gallery/upload',
  '/dashboard/hero': '/dashboard/hero/edit',
};

export default function CreateButton() {
  const pathname = usePathname();
  const href = formLinks[pathname];
  if (!href) {
    return null;
  }

  return (
    <Link href={href} className={styles.createButton}>
      <Plus size={24} />
    </Link>
  );
}