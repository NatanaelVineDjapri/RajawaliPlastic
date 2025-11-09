'use client';

import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm h-100">
      <div className="d-flex flex-column gap-1">
        <span className="small text-muted">{title}</span>
        <strong className="fs-2 fw-bold text-dark">{value}</strong>
      </div>
      <div
        className="d-flex align-items-center justify-content-center rounded-3"
        style={{
          backgroundColor: iconBgColor,
          width: '3.5rem',
          height: '3.5rem',
        }}
      >
        <Icon style={{ color: iconColor }} size={28} />
      </div>
    </div>
  );
}