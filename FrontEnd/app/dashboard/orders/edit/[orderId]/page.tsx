"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/TempButton";
import { getOrderById, updateOrder } from "@/services/orderService";
import { getProducts } from "@/services/productService";

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderProduct {
  product_id: number;
  quantity: number;
  total_price: number;
}

interface Order {
  id: number;
  user_email: string;
  status_delivery: string;
  status_payment: string;
  notes: string;
  products: OrderProduct[];
}

interface ApiOrderProduct {
  product_id: string | number;
  quantity: string | number;
  total_price: string | number;
}

export default function EditOrderPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
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

        const orderData: Order = {
          ...orderRes.data,
          products: orderRes.data.products.map((p: ApiOrderProduct) => ({
            product_id: Number(p.product_id),
            quantity: Number(p.quantity),
            total_price: Number(p.total_price),
          })),
        };

        setOrder(orderData);
        setProducts(productRes.data);
      } catch (err: unknown) {
        let errorMessage = "Gagal memuat data";
        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === 'object' && err !== null && 'message' in err) {
            errorMessage = (err as { message: string }).message; 
        }
        MySwal.fire("Error", errorMessage, "error");
        router.push("/dashboard/orders");
      }
    };
    fetchData();
  }, [orderId, router]);

  const handleChange = <K extends keyof Order>(field: K, value: Order[K]) => {
    if (!order) return;
    setOrder({ ...order, [field]: value });
  };

  const handleProductChange = (
    index: number,
    field: keyof OrderProduct,
    value: string | number
  ) => {
    if (!order) return;
    const updated = [...order.products];
    const numericValue = Number(value) || 0;

    if (field === "product_id") {
      updated[index][field] = numericValue;
    } else if (field === "quantity") {
      updated[index][field] = Math.max(1, numericValue); 
    } else if (field === "total_price") {
        updated[index][field] = numericValue;
    }

    const selectedProduct = products.find(
      (p) => p.id === updated[index].product_id
    );
    const pricePerUnit = selectedProduct ? selectedProduct.price : 0;
    updated[index].total_price = pricePerUnit * updated[index].quantity;

    setOrder({ ...order, products: updated });
  };

  const handleQuantity = (index: number, delta: number) => {
    if (!order) return;
    const updated = [...order.products];
    const newQty = Math.max(1, (updated[index].quantity || 0) + delta);
    const selectedProduct = products.find(
      (p) => p.id === updated[index].product_id
    );
    const pricePerUnit = selectedProduct ? selectedProduct.price : 0;
    updated[index].quantity = newQty;
    updated[index].total_price = pricePerUnit * newQty;
    setOrder({ ...order, products: updated });
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
    const updated = [...order.products];
    updated.splice(index, 1);
    setOrder({ ...order, products: updated });
  };

  const getGrandTotal = () => {
    if (!order) return 0;
    return order.products.reduce(
      (sum, item) => sum + (item.total_price || 0),
      0
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!order) return;

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
    } catch (err: unknown) {
      let errorMessage = "Update failed";
      if (err instanceof Error) {
          errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message; 
      }
      MySwal.fire("Error", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getProductPrice = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.price : 0;
  };

  if (!order) return <div className="p-5 text-center">Loading order...</div>;

  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-lg-4 col-12">
          <div className="bg-white rounded-3 shadow p-4 h-100">
            <h5 className="fw-bold mb-4">Order Details</h5>
            <div className="mb-3">
              <label className="form-label fw-semibold small">User Email</label>
              <input
                type="email"
                className="form-control p-3"
                value={order.user_email}
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
                onChange={(e) =>
                  handleChange("status_delivery", e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="proses">Proses</option>
                <option value="kirim">Kirim</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold small">
                Status Payment
              </label>
              <select
                className="form-select"
                value={order.status_payment}
                onChange={(e) =>
                  handleChange("status_payment", e.target.value)
                }
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
                rows={2}
                placeholder="Add Note to Order..."
                value={order.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-12">
          <div className="bg-white rounded-3 shadow p-4 overflow-auto">
            <h5 className="fw-bold mb-3">Daftar Produk</h5>
            <div className="d-flex flex-column gap-3">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-3 p-3 shadow-sm bg-white flex-shrink-0"
                >
                  <div className="row g-3 align-items-center">
                    <div className="col-md-5 col-12">
                      <label className="form-label small fw-semibold mb-1">
                        Product
                      </label>
                      <select
                        className="form-select"
                        value={item.product_id}
                        onChange={(e) =>
                          handleProductChange(index, "product_id", Number(e.target.value))
                        }
                      >
                        <option value={0}>-- Pilih Produk --</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Rp {getProductPrice(p.id).toLocaleString("id-ID")})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 col-6">
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
                              Number(e.target.value) || 1
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
                    <div className="col-md-3 col-6">
                      <label className="form-label small fw-semibold mb-1">
                        Price (Rp)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={item.total_price}
                        min={0}
                        readOnly
                      />
                      <small className="text-muted d-block mt-1">
                        @ Rp {getProductPrice(item.product_id).toLocaleString("id-ID")}
                      </small>
                    </div>
                    <div className="col-md-1 col-12 d-flex align-items-end mt-2 mt-md-0">
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
            </div>

            <button
              type="button"
              className="btn btn-outline-primary mt-3 w-100"
              onClick={handleAddProduct}
            >
              Add Product
            </button>

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