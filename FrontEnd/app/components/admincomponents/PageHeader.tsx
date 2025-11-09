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
    <div className="mb-3"> 
      <h1 className="fs-2 fw-bold text-dark mb-2">
        {title}
      </h1>
      
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          
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
    </div>
  );
}