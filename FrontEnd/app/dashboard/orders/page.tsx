"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Edit3 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getOrders } from "@/services/orderService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Order, Product, StatusType } from "../../types";
import OrderListSkeleton from "@/app/components/admincomponents/skeletons/OrderListSkeleton";

const MySwal = withReactContent(Swal);

const getDeliveryStatusBadge = (status: StatusType) => {
  switch (status) {
    case "pending":
      return <span className="badge text-bg-warning fs-6">Pending</span>;
    case "proses":
      return <span className="badge text-bg-info fs-6">Processing</span>;
    case "kirim":
      return <span className="badge text-bg-primary fs-6">Shipped</span>;
    case "selesai":
      return <span className="badge text-bg-success fs-6">Completed</span>;
    default:
      return <span className="badge text-bg-secondary fs-6">{status}</span>;
  }
};

const getPaymentStatusBadge = (status: StatusType) => {
  switch (status) {
    case "pending":
      return <span className="badge text-bg-warning fs-6">Pending</span>;
    case "paid":
      return <span className="badge text-bg-success fs-6">Paid</span>;
    case "failed":
      return <span className="badge text-bg-danger fs-6">Failed</span>;
    case "unpaid":
      return <span className="badge text-bg-warning fs-6">Unpaid</span>;
    default:
      return <span className="badge text-bg-secondary fs-6">{status}</span>;
  }
};

const OrderRow: React.FC<{ order: Order }> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: any) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(price) || 0);

  return (
    <div
      className={`card mb-3 shadow-sm ${
        isExpanded ? "bg-light border-primary" : "border-0"
      }`}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className={`btn btn-sm ${
                isExpanded ? "btn-primary" : "btn-outline-primary"
              } me-3 p-1`}
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ width: "30px", height: "30px" }}
            >
              <ChevronRight
                size={18}
                className={isExpanded ? "rotate-90 text-white" : "text-primary"}
                style={{ transition: "transform 0.3s" }}
              />
            </button>

            <div>
              <h6 className="mb-0 fw-bold">Order #{order.order_no}</h6>
              <small className="text-muted">
                {order.user_email || "Unknown Email"} |{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString("id-ID")
                  : "Unknown Date"}
              </small>
            </div>
          </div>

          <div className="d-flex text-end">
            <div className="me-3 d-none d-sm-block">
              <small className="d-block text-muted">ID: {order.id}</small>
              <small className="d-block fw-bold text-primary">
                Total: {formatPrice(order.total_price)}
              </small>
            </div>

            <Link
              href={`/dashboard/orders/edit/${order.id}`}
              className="btn btn-outline-secondary"
            >
              <Edit3 size={16} className="me-1" /> Edit
            </Link>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-3 border-top mx-3 mb-3">
            <div className="row g-3">
              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Product Details</h6>
                <p className="small text-muted mb-1">
                  Address: {order.address || "N/A"}
                </p>

                <ul className="small mb-0 p-2 border rounded bg-white list-unstyled">
                  {order.products?.length ? (
                    order.products.map((p: Product, i: number) => (
                      <li key={i}>
                        {i + 1}. {p.name} — {p.quantity} pcs
                      </li>
                    ))
                  ) : (
                    <li>Unknown Product — 1 pcs</li>
                  )}
                </ul>
              </div>

              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Payment Status</h6>
                {getPaymentStatusBadge(order.status_payment)}
              </div>

              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Delivery Status</h6>
                {getDeliveryStatusBadge(order.status_delivery)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState<"none" | "payment" | "delivery">(
    "none"
  );
  const [filterPayment, setFilterPayment] = useState("all");
  const [filterDelivery, setFilterDelivery] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setIsLoading(true);
    try {
      const res = await getOrders();

      if (res.data && Array.isArray(res.data)) {
        const transformed = res.data.map((order: Order) => ({
          ...order,
          products:
            order.products?.map((p: any) => ({
              id: p.product_id,
              name: p.product_name || p.name || "Unknown Product",
              quantity: p.quantity || 1,
            })) || [],
          total_price: Number(order.total_price) || 0,
        }));

        setOrders(transformed);
      }
    } catch (err) {
      MySwal.fire("Error", "Failed to load page data", "error");
    } finally {
      setIsLoading(false);
    }
  }

  let finalOrders = [...orders];

  if (filterPayment !== "all") {
    finalOrders = finalOrders.filter((o) => o.status_payment === filterPayment);
  }

  if (filterDelivery !== "all") {
    finalOrders = finalOrders.filter(
      (o) => o.status_delivery === filterDelivery
    );
  }

  if (filterPayment === "all" && filterDelivery === "all") {
    if (sortType === "payment") {
      finalOrders.sort((a, b) =>
        (a.status_payment || "").localeCompare(b.status_payment || "")
      );
    }
    if (sortType === "delivery") {
      finalOrders.sort((a, b) =>
        (a.status_delivery || "").localeCompare(b.status_delivery || "")
      );
    }
  }

  return (
    <div className="w-100">
      <PageHeader
        title="Order List"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Order List" },
        ]}
      />

      <div className="row g-2 mb-4">
        <div className="col-12 col-sm-4 col-md-3">
          <select
            className="form-select"
            value={sortType}
            disabled={filterPayment !== "all" || filterDelivery !== "all"}
            onChange={(e) => setSortType(e.target.value as any)}
          >
            <option value="none">Sort: Default</option>
            <option value="payment">Sort by Payment</option>
            <option value="delivery">Sort by Delivery</option>
          </select>
        </div>

        <div className="col-12 col-sm-4 col-md-3">
          <select
            className="form-select"
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
          >
            <option value="all">Payment: All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div className="col-12 col-sm-4 col-md-3">
          <select
            className="form-select"
            value={filterDelivery}
            onChange={(e) => setFilterDelivery(e.target.value)}
          >
            <option value="all">Delivery: All</option>
            <option value="pending">Pending</option>
            <option value="proses">Processing</option>
            <option value="kirim">Shipped</option>
            <option value="selesai">Completed</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <OrderListSkeleton count={10} />
      ) : finalOrders.length === 0 ? (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">No matching orders found.</p>
        </div>
      ) : (
        finalOrders.map((order) => <OrderRow key={order.id} order={order} />)
      )}
    </div>
  );
}
