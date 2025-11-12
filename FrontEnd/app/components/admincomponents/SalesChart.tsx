'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartCardProps {
  orders: any[];
}

export default function SalesChartCard({ orders }: SalesChartCardProps) {
  const dailyMap: Record<string, { totalSales: number; totalOrders: number }> = {};
  orders.forEach(order => {
    const date = new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    if (!dailyMap[date]) {
      dailyMap[date] = { totalSales: 0, totalOrders: 0 };
    }
    dailyMap[date].totalSales += order.total_price || 0;
    dailyMap[date].totalOrders += 1;
  });

  const labels = Object.keys(dailyMap).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const salesData = labels.map(label => dailyMap[label].totalSales);
  const ordersData = labels.map(label => dailyMap[label].totalOrders);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Total Penjualan',
        data: salesData,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
      {
        label: 'Jumlah Order',
        data: ordersData,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('id-ID', { maximumFractionDigits: 0 }),
        },
      },
    },
  };

  return (
    <div className="p-3 p-md-4 bg-white rounded-3 shadow-sm" style={{ height: '350px' }}>
      <h2 className="fs-5 fw-bold mb-3 text-center text-md-start">Penjualan & Order Harian</h2>
      <div className="position-relative" style={{ height: '280px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
