'use client';

import React from 'react';
import styles from './StatCard.module.css';
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
    <div className={styles.card}>
      <div className={styles.textWrapper}>
        <span className={styles.title}>{title}</span>
        <strong className={styles.value}>{value}</strong>
      </div>
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon className={styles.icon} style={{ color: iconColor }} size={28} />
      </div>
    </div>
  );
}
