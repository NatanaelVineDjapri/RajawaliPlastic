"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Edit3 } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import { getOrders } from "@/services/orderService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Order, Product, StatusType } from "../../types";

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

interface OrderRowProps {
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: any) => {
    if (price === null || price === undefined || price === "") return "Rp 0";
    const parsed = Number(price);
    if (isNaN(parsed)) return "Rp 0";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parsed);
  };

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
              style={{ width: "30px", height: "30px", flexShrink: 0 }}
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

          <div className="d-flex align-items-center text-end">
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
                <div className="small mb-0 p-2 border rounded bg-white">
                  <ul className="list-unstyled mb-0">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product: Product, index: number) => (
                        <li key={product.product_id || product.id || index}>
                          {index + 1}. {product.name || "Unknown Product"} —{" "}
                          {product.quantity || 1} pcs
                        </li>
                      ))
                    ) : (
                      <li>Unknown Product — 1 pcs</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Transaction Status</h6>
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

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Order List" },
  ];

  async function fetchOrders() {
    setIsLoading(true);
    try {
      const orderResult = await getOrders();

      if (orderResult.data && Array.isArray(orderResult.data)) {
        const transformedOrders = orderResult.data.map((order: Order) => {
          const productsArray: Product[] =
            Array.isArray(order.products) && order.products.length > 0
              ? order.products.map((p: any) => ({
                  product_id: p.product_id,
                  id: p.product_id,
                  name: p.product_name || p.name || "Unknown Product",
                  quantity: p.quantity || 1,
                }))
              : [
                  {
                    product_id: order.id,
                    id: order.id,
                    name: "Unknown Product",
                    quantity: 1,
                  },
                ];

          return {
            ...order,
            products: productsArray,
            total_price: Number(order.total_price) || 0,
          };
        });

        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      MySwal.fire("Error", "Failed to load page data.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-100">
      <PageHeader title="Order List" breadcrumbs={breadcrumbs} />

      {isLoading ? (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center p-5 bg-white rounded-3 shadow-sm">
          <p className="text-muted mb-0">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => <OrderRow key={order.id} order={order} />)
      )}
    </div>
  );
}
