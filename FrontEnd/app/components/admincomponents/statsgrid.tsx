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

interface StatsGridProps {
  summary: any; // object atau array
}

export default function StatsGrid({ summary }: StatsGridProps) {
  // Jika summary object, ubah ke array
  const summaryArray = Array.isArray(summary) ? summary : [summary];

  const totalCustomer = summaryArray.length;
  const totalOrder = summaryArray.reduce((acc, cur) => acc + (cur.total_orders || 0), 0);
  const totalSales = summaryArray.reduce((acc, cur) => acc + (cur.total_price || 0), 0);

  const stats: StatItem[] = [
    {
      title: 'Total Customer',
      value: totalCustomer.toLocaleString(),
      icon: Users,
      iconBgColor: '#EDE9FE',
      iconColor: '#8B5CF6',
    },
    {
      title: 'Total Order',
      value: totalOrder.toLocaleString(),
      icon: Archive,
      iconBgColor: '#FEF3C7',
      iconColor: '#F59E0B',
    },
    {
      title: 'Total Sales',
      value: `RP ${totalSales.toLocaleString()}`,
      icon: TrendingUp,
      iconBgColor: '#D1FAE5',
      iconColor: '#10B981',
    },
  ];

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
    </div>
  );
}
