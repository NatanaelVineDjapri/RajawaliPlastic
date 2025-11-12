'use client';
import React, { useEffect, useState } from 'react';
import StatsGrid from '../components/admincomponents/StatsGrid';
import SalesChartCard from '../components/admincomponents/SalesChart';
import RecentlySoldTable from '../components/admincomponents/RecentlySold';
import { getOrders, getOrderSummary, getOrderDetailSummary } from '@/services/orderService';

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [detailSummary, setDetailSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ordersRes = await getOrders();
        const summaryRes = await getOrderSummary();
        const detailRes = await getOrderDetailSummary();

        setOrders(ordersRes.data || []);
        setSummary(summaryRes.data || []);
        setDetailSummary(detailRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
      <div className="row g-3">
        <div className="col-12">
          <StatsGrid summary={summary} />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-12">
          <SalesChartCard orders={orders} />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12">
          <RecentlySoldTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
