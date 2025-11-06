'use client';

import React from 'react';
import StatCard from './statcards';
import styles from './StatsGrid.module.css';
import { Users, Archive, TrendingUp } from 'lucide-react';

const stats = [
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
    <div className={styles.grid}>
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}
