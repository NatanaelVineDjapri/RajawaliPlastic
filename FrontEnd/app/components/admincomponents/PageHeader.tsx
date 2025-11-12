'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="page-header mb-3"> 
      <h1 className="page-title fs-2 fw-bold text-dark mb-2">{title}</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 flex-wrap">
          {breadcrumbs.map((item, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            return (
              <li 
                key={index} 
                className={`breadcrumb-item ${isLastItem ? 'active' : ''}`}
                aria-current={isLastItem ? 'page' : undefined}
              >
                {!isLastItem && item.href ? (
                  <Link href={item.href} className="text-decoration-none">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <style jsx>{`
        .page-title {
          font-size: 2rem;
        }
        @media (max-width: 576px) {
          .page-header {
            margin-bottom: 1rem;
          }
          .page-title {
            font-size: 1.4rem;
          }
          .breadcrumb {
            font-size: 0.85rem;
          }
        }
        @media (min-width: 577px) and (max-width: 991px) {
          .page-title {
            font-size: 1.6rem;
          }
          .breadcrumb {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}