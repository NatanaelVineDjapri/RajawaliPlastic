'use client';

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
    <div className="d-flex justify-content-between align-items-center bg-white p-4 rounded-4 shadow-sm h-100 stat-card">
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

      <style jsx>{`
        @media (max-width: 576px) {
          .stat-card {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
            padding: 1.25rem;
          }
          .stat-card strong {
            font-size: 1.5rem !important;
          }
          .stat-card div:last-child {
            width: 2.8rem !important;
            height: 2.8rem !important;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .stat-card strong {
            font-size: 1.75rem !important;
          }
          .stat-card div:last-child {
            width: 3rem !important;
            height: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
}