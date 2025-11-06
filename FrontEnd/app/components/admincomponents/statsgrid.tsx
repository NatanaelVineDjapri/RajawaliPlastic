'use client';

import React from 'react';
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
  // ... (data stats Anda tetap sama) ...
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
    <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
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
    </div>
  );
}