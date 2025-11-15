"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import { getOrderById, updateOrder } from "@/services/orderService";
import { getProducts } from "@/services/productService";

import type { 
  Order as BaseOrder, 
  StatusType 
} from "@/app/types"; 

const MySwal = withReactContent(Swal);

interface ProductMaster {
  id: string; 
  name: string;
}

interface OrderLineItem {
  product_id: string | number;
  quantity: number;
  total_price: number;
}

interface OrderForPage extends Omit<BaseOrder, 'products' | 'id' | 'total_price'> {
  id: string; 
  total_price: number;
  products: OrderLineItem[];
}


interface ApiOrderProduct {
  product_id: string | number; 
  quantity: string | number;
  total_price: string | number;
}

export default function EditOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<OrderForPage | null>(null);
  const [products, setProducts] = useState<ProductMaster[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const pageTitle = "Edit Order";
  const breadcrumbs = [
    { label: "Order List", href: "/dashboard/orders" },
    { label: "Edit Order" },
  ];

  useEffect(() => {
    const currentOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
    if (!currentOrderId) {
      MySwal.fire("Error", "Order ID tidak valid", "error");
      router.push("/dashboard/orders");
      return;
    }

    const fetchData = async () => {
      try {
        const [orderRes, productRes] = await Promise.all([
          getOrderById(currentOrderId as string),
          getProducts(),
        ]);

        if (!orderRes.data) {
          throw new Error("Data order tidak ditemukan");
        }
        
        console.log("Data Order Mentah dari API:", orderRes.data);
        console.log("Data Master Produk:", productRes.data);

        const orderData: OrderForPage = {
          ...orderRes.data,
          id: orderRes.data.id, 
          total_price: Number(orderRes.data.total_price),
          products: orderRes.data.products.map((p: ApiOrderProduct) => ({
            product_id: p.product_id, 
            quantity: Number(p.quantity),
            total_price: Number(p.total_price),
          })),
        };

        setOrder(orderData);
        
        const masterProducts = productRes.data
          .map((p: any) => ({
            id: p.id, 
            name: p.name,
          }))
          .filter((p: ProductMaster) => p.id); 

        setProducts(masterProducts);

      } catch (err: any) {
        MySwal.fire("Error", err.message || "Gagal memuat data", "error");
        router.push("/dashboard/orders");
      } finally {
        setPageIsLoading(false);
      }
    };
    fetchData();
  }, [orderId, router]);


  const handleChange = (field: keyof OrderForPage, value: any) => {
    if (!order) return;
    setOrder((prev) => ({ ...prev!, [field]: value }));
  };

  const handleProductChange = (
    index: number,
    field: keyof OrderLineItem,
    value: string | number
  ) => {
    if (!order) return;

    const updated = [...order.products];
    const item = updated[index];

    if (field === "product_id") {
      item.product_id = value; 
    } else if (field === "quantity") {
      item.quantity = Math.max(1, Number(value) || 1);
    } else if (field === "total_price") {
      item.total_price = Number(value) || 0;
    }

    setOrder({ ...order, products: updated });
  };

  const handleQuantity = (index: number, delta: number) => {
    if (!order) return;
    const item = order.products[index];
    const newQty = Math.max(1, (item.quantity || 0) + delta);
    handleProductChange(index, "quantity", newQty);
  };

  const handleAddProduct = () => {
    if (!order) return;
    setOrder({
      ...order,
      products: [
        ...order.products,
        { product_id: 0, quantity: 1, total_price: 0 }, 
      ],
    });
  };

  const handleRemoveProduct = (index: number) => {
    if (!order) return;
    const updated = order.products.filter((_, i) => i !== index);
    setOrder({ ...order, products: updated });
  };

  const getGrandTotal = () => {
    if (!order) return 0;
    return order.products.reduce(
      (sum: number, item: OrderLineItem) => sum + (item.total_price || 0),
      0
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!order) return;
    
    const hasInvalidProduct = order.products.some(p => p.product_id === 0);
    if (hasInvalidProduct) {
      MySwal.fire("Warning", "Pastikan semua produk sudah dipilih", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        user_email: order.user_email,
        products: order.products,
        status_delivery: order.status_delivery,
        status_payment: order.status_payment,
        notes: order.notes,
      };
      const res = await updateOrder(order.id, payload);
      MySwal.fire("Success!", res.message || "Order updated!", "success");
      router.push("/dashboard/orders");
    } catch (err: any) {
      MySwal.fire("Error", err.message || "Update failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageIsLoading)
    return <div className="p-5 text-center">Loading order...</div>;
  if (!order)
    return (
      <div className="p-5 text-center text-danger">Gagal memuat data order.</div>
    );

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-4">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <h5 className="fw-bold mb-4">Order Details</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold small">User Email</label>
              <input
                type="email"
                className="form-control p-3"
                value={order.user_email || ""}
                onChange={(e) => handleChange("user_email", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold small">
                Status Delivery
              </label>
              <select
                className="form-select"
                value={order.status_delivery}
                onChange={(e) => handleChange("status_delivery", e.target.value as StatusType)}
              >
                <option value="pending">Pending</option>
                <option value="proses">Processing</option>
                <option value="kirim">Shipped</option>
                <option value="selesai">Completed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">
                Status Payment
              </label>
              <select
                className="form-select"
                value={order.status_payment}
                onChange={(e) => handleChange("status_payment", e.target.value as StatusType)}
              >
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Note</label>
              <textarea
                className="form-control p-3"
                rows={1}
                placeholder="Add Note to Order..."
                value={order.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="bg-white rounded-3 shadow p-4">
            <h5 className="fw-bold mb-3">Daftar Produk</h5>

            {order.products.map((item, index) => (
              <div
                key={index} 
                className="border rounded-3 p-3 mb-3 shadow-sm bg-white"
              >
                <div className="row g-3 align-items-center">
                  <div className="col-md-5">
                    <label className="form-label small fw-semibold mb-1">
                      Product
                    </label>
                    <select
                      className="form-select"
                      value={item.product_id}
                      onChange={(e) =>
                        handleProductChange(index, "product_id", e.target.value)
                      }
                    >
                      <option value={0}>-- Pilih Produk --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold mb-1">
                      Quantity
                    </label>
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleQuantity(index, -1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleQuantity(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label small fw-semibold mb-1">
                      Price (Rp)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={item.total_price || 0}
                      min={0}
                      onChange={(e) =>
                        handleProductChange(index, "total_price", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-1 d-flex align-items-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger w-100"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-primary mb-3 w-100"
              onClick={handleAddProduct}
            >
              Add Product
            </button>

            {/* Grand Total */}
            <div className="border-top pt-3 mt-2 text-end">
              <h6 className="fw-bold">
                Total Order : Rp {getGrandTotal().toLocaleString("id-ID")}
              </h6>
            </div>

            <div className="mt-4">
              <SubmitButton
                isLoading={isLoading}
                text="Update Order"
                loadingText="Updating..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}