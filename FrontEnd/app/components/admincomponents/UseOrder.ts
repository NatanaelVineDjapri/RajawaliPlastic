'use client';

import { useState, useEffect } from 'react';
import {
  getOrders,
  getOrderSummary,
  getOrderDetailSummary
} from '@/services/orderService';

export const useOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [detailSummary, setDetailSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const ordersRes = await getOrders();
      const summaryRes = await getOrderSummary();
      const detailSummaryRes = await getOrderDetailSummary();

      setOrders(ordersRes.data);
      setSummary(summaryRes.data);
      setDetailSummary(detailSummaryRes.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengambil data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const refetch = () => fetchAll();

  return {
    orders,
    summary,
    detailSummary,
    loading,
    error,
    refetch,
  };
};
