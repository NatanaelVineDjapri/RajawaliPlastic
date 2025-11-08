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

const labels = ['01 Okt', '03 Okt', '05 Okt', '07 Okt', '09 Okt', '11 Okt', '13 Okt', '15 Okt', '17 Okt', '19 Okt', '21 Okt', '23 Okt', '25 Okt', '27 Okt', '29 Okt', '31 Okt'];

const chartData: ChartData<'line'> = {
    labels,
    datasets: [
        {
            label: 'Total Penjualan',
            data: [20000, 25000, 32000, 30000, 35000, 38000, 39000, 40689, 39500, 35000, 33000, 30000, 28000, 29000, 31000, 30000],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        },
    ],
};

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: { mode: 'index', intersect: false }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 7 }
        },
        y: {
            beginAtZero: false,
            ticks: {
                callback: function(value) {
                    return value.toLocaleString('id-ID', { maximumFractionDigits: 0 });
                }
            }
        }
    }
};

const SalesChartCard: React.FC = () => {
    const peakValue = '40,689';

    return (
        <div className="p-4 bg-white rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-4 fw-bold mb-0">Total Penjualan Harian</h2>
                <select className="form-select form-select-sm w-auto">
                    <option value="oct">Oktober 2024</option>
                    <option value="sep">September 2024</option>
                    <option value="aug">Agustus 2024</option>
                </select>
            </div>

            <div className="position-relative" style={{ height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
                <div 
                    className="position-absolute top-0 start-50 translate-middle-x badge bg-primary py-1 px-3" 
                    style={{ zIndex: 10, marginTop: '-10px' }}
                >
                    {peakValue}
                </div>
            </div>
        </div>
    );
};

export default SalesChartCard;