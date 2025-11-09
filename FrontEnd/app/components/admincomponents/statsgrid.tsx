'use client';

import StatCard from './StatCard';
import { Users, Archive, TrendingUp, type LucideIcon } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

const stats: StatItem[] = [
  {
    title: 'Total Customer',
    value: '40,689',
    icon: Users,
    iconBgColor: '#EDE9FE',
    iconColor: '#8B5CF6',
  },
  {
    title: 'Total Order',
    value: '10,293',
    icon: Archive,
    iconBgColor: '#FEF3C7',
    iconColor: '#F59E0B',
  },
  {
    title: 'Total Sales',
    value: '$89,000',
    icon: TrendingUp,
    iconBgColor: '#D1FAE5',
    iconColor: '#10B981',
  },
];

export default function StatsGrid() {
  return (
    <div className="stats-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
      {stats.map((stat) => (
        <div key={stat.title} className="col">
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        </div>
      ))}

      <style jsx>{`
        @media (max-width: 576px) {
          .stats-grid {
            gap: 1rem !important;
          }
          .stats-grid .col {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .stats-grid .col {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  );
}