"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import {
  getOrderById,
  updateOrder,
} from "@/services/orderService";
import { getProducts } from "@/services/productService";

const MySwal = withReactContent(Swal);

export default function EditOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pageTitle = "Edit Order";
  const breadcrumbs = [
    { label: "Order List", href: "/dashboard/orders" },
    { label: "Edit Order" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, productRes] = await Promise.all([
          getOrderById(orderId as string),
          getProducts(),
        ]);
        setOrder(orderRes.data);
        setProducts(productRes.data);
      } catch (err: any) {
        MySwal.fire("Error", err.message || "Gagal memuat data", "error");
        router.push("/dashboard/orders");
      }
    };
    fetchData();
  }, [orderId, router]);

  const handleChange = (field: string, value: any) => {
    setOrder((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updated = [...order.products];
    updated[index][field] = value;

    if (field === "quantity") {
      const selectedProduct = products.find(p => p.id === updated[index].product_id);
      const pricePerUnit = selectedProduct ? selectedProduct.price : 0;
      updated[index].total_price = pricePerUnit * parseInt(value || 0);
    }

    setOrder((prev: any) => ({ ...prev, products: updated }));
  };

  const handleQuantity = (index: number, delta: number) => {
    const updated = [...order.products];
    const newQty = Math.max(1, (updated[index].quantity || 1) + delta);

    const selectedProduct = products.find(p => p.id === updated[index].product_id);
    const pricePerUnit = selectedProduct ? selectedProduct.price : 0;

    updated[index].quantity = newQty;
    updated[index].total_price = pricePerUnit * newQty;

    setOrder((prev: any) => ({ ...prev, products: updated }));
  };

  const handleAddProduct = () => {
    setOrder((prev: any) => ({
      ...prev,
      products: [
        ...prev.products,
        { product_id: "", quantity: 1, total_price: 0 },
      ],
    }));
  };

  const handleRemoveProduct = (index: number) => {
    const updated = [...order.products];
    updated.splice(index, 1);
    setOrder((prev: any) => ({ ...prev, products: updated }));
  };

  const getGrandTotal = () => {
    return order.products.reduce(
      (sum: number, item: any) => sum + (item.total_price || 0),
      0
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  if (!order) return <div className="p-5 text-center">Loading order...</div>;

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
              <label className="form-label fw-semibold small">Status Delivery</label>
              <select
                className="form-select"
                value={order.status_delivery}
                onChange={(e) => handleChange("status_delivery", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="proses">Proses</option>
                <option value="kirim">Kirim</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Status Payment</label>
              <select
                className="form-select"
                value={order.status_payment}
                onChange={(e) => handleChange("status_payment", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
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

            {order.products.map((item: any, index: number) => (
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
                      <option value="">-- Pilih Produk --</option>
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
                          handleProductChange(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
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
                        handleProductChange(
                          index,
                          "total_price",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="col-md-1 d-flex align-items-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger w-70"
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
                Total Order : Rp{" "}
                {getGrandTotal().toLocaleString("id-ID")}
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
