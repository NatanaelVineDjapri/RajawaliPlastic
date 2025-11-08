'use client';

import React, { useState } from "react";
import { ChevronRight, Edit3 } from "lucide-react";
import StatusDropdown from "@/app/components/admincomponents/StatusDropdown";

type StatusType = "Unpaid" | "Paid" | "Processing" | "Rejected" | "Completed";

interface Product {
  id: number;
  name: string;
  quantity: number;
}

interface Order {
  orderNo: string;
  customerEmail: string;
  address: string;
  dateOrdered: string;
  itemType: string;
  id: string;
  totalPrice: string;
  products: Product[];
  transactionStatus: StatusType;
  deliveryStatus: StatusType;
}

const initialOrders: Order[] = [
  {
    orderNo: "00001",
    customerEmail: "christinebrooks@gmail.com",
    address: "089 Kutch Green Apt. 448",
    dateOrdered: "04 Sep 2019",
    itemType: "6",
    id: "1283I2788284187489",
    totalPrice: "1.000.000",
    products: [
      { id: 1, name: "Plastik besar", quantity: 10 },
      { id: 2, name: "Plastik kecil", quantity: 10 },
      { id: 3, name: "Plastik mikro", quantity: 100 },
      { id: 4, name: "Plastik mainan", quantity: 500 },
    ],
    transactionStatus: "Unpaid",
    deliveryStatus: "Rejected",
  },
  {
    orderNo: "00002",
    customerEmail: "rosiepearson@gmail.com",
    address: "Citra 5 blok E3 no 5",
    dateOrdered: "28 May 2019",
    itemType: "Microplastics",
    id: "1283I2788284187490",
    totalPrice: "500.000",
    products: [{ id: 1, name: "Microplastics A", quantity: 500 }],
    transactionStatus: "Paid",
    deliveryStatus: "Completed",
  },
];

interface OrderRowProps {
  order: Order;
  onStatusChange: (
    orderNo: string,
    type: "transaction" | "delivery",
    newStatus: StatusType
  ) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(order.orderNo === "00001");

  const handleStatusChange = (
    type: "transaction" | "delivery",
    newStatus: StatusType
  ) => {
    onStatusChange(order.orderNo, type, newStatus);
  };

  const handleEditClick = () => {
    const editUrl = `/dashboard/orders/edit/${parseInt(order.orderNo)}`;
    window.location.href = `http://localhost:3000${editUrl}`;
  };

  return (
    <div className={`card mb-3 shadow-sm ${isExpanded ? 'bg-light border-primary' : 'border-0'}`}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-outline-primary'} me-3 p-1`}
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ width: '30px', height: '30px', flexShrink: 0 }}
            >
              <ChevronRight
                size={18}
                className={isExpanded ? "rotate-90 text-white" : "text-primary"}
                style={{ transition: 'transform 0.3s' }}
              />
            </button>
            <div>
              <h6 className="mb-0 fw-bold">Order #{parseInt(order.orderNo)}</h6>
              <small className="text-muted">{order.customerEmail} | {order.dateOrdered}</small>
            </div>
          </div>

          <div className="d-flex align-items-center text-end">
            <div className="me-3 d-none d-sm-block">
              <small className="d-block text-muted">ID: {order.id}</small>
              <small className="d-block fw-bold text-primary">Total: Rp {order.totalPrice}</small>
            </div>
            <button className="btn btn-outline-secondary" onClick={handleEditClick}>
              <Edit3 size={16} className="me-1" /> Edit
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-3 border-top">
            <div className="row g-3">
              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Product Details</h6>
                <p className="small text-muted mb-1">
                  Address: {order.address} | Item Type: {order.itemType}
                </p>
                <div className="small mb-0 p-2 border rounded bg-white">
                  <ul className="list-unstyled mb-0">
                    {order.products.map((product, index) => (
                      <li key={product.id}>
                        {index + 1}. {product.name} — {product.quantity} pcs
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Transaction Status</h6>
                <StatusDropdown
                  statusType="transaction"
                  currentStatus={order.transactionStatus}
                  orderId={parseInt(order.orderNo)}
                  onStatusChange={(id, type, newStatus) =>
                    handleStatusChange(type, newStatus)
                  }
                />
              </div>

              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Delivery Status</h6>
                <StatusDropdown
                  statusType="delivery"
                  currentStatus={order.deliveryStatus}
                  orderId={parseInt(order.orderNo)}
                  onStatusChange={(id, type, newStatus) =>
                    handleStatusChange(type, newStatus)
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  const [orders, setOrders] = useState(initialOrders);

  const handleGlobalStatusChange = (
    orderNo: string,
    type: "transaction" | "delivery",
    newStatus: StatusType
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderNo === orderNo
          ? {
              ...order,
              [type === "transaction" ? "transactionStatus" : "deliveryStatus"]: newStatus,
            }
          : order
      )
    );
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Order Lists</h1>
      {orders.map((order) => (
        <OrderRow key={order.orderNo} order={order} onStatusChange={handleGlobalStatusChange} />
      ))}
    </div>
  );
}