"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { addOrder } from "@/services/orderService";
import { getProducts } from "@/services/productService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PageHeader from "@/app/components/admincomponents/PageHeader";
import SubmitButton from "@/app/components/admincomponents/SubmitButton";
import CustomSelect, {
  SelectOption,
} from "@/app/components/admincomponents/CustomSelect";
import { Plus, Trash2 } from "lucide-react"; // Import ikon

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  name: string;
  price?: number;
}

interface OrderProduct {
  productId: string;
  quantity: number;
  totalPrice: number;
}

const statusOptions: SelectOption[] = [
  { value: "pending", label: "Pending" },
  { value: "proses", label: "Processing" },
  { value: "kirim", label: "Shipped" },
  { value: "selesai", label: "Completed" },
];

export default function CreateOrderPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [notes, setNotes] = useState<string>("");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [productOptions, setProductOptions] = useState<SelectOption[]>([]);
  
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([
    { productId: "", quantity: 1, totalPrice: 0 } 
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch produk (hanya sekali)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await getProducts();
        if (result.data && Array.isArray(result.data)) {
          setProducts(result.data);
          const options = result.data.map((product: Product) => ({
            value: String(product.id),
            label: product.name,
          }));
          setProductOptions(options);
          if (result.data.length > 0) {
            handleProductChange(0, String(result.data[0].id));
          }
        } else {
          setProducts([]);
          setProductOptions([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        MySwal.fire("Error", "Failed to load product data.", "error");
      }
    }
    fetchProducts();
  }, []);

 
  const updateOrderProduct = (index: number, field: keyof OrderProduct, value: string | number) => {
    const updatedProducts = [...orderProducts];
    const product = updatedProducts[index];

    if (field === 'productId') {
      const selectedProduct = products.find((p) => String(p.id) === value);
      product.productId = String(value);
      product.totalPrice = (selectedProduct?.price || 0) * product.quantity;
    } else if (field === 'quantity') {
      const selectedProduct = products.find((p) => String(p.id) === product.productId);
      product.quantity = Number(value);
      product.totalPrice = (selectedProduct?.price || 0) * product.quantity;
    } else if (field === 'totalPrice') {
      product.totalPrice = Number(value);
    }
    
    setOrderProducts(updatedProducts);
  };

  const handleProductChange = (index: number, productId: string) => {
    updateOrderProduct(index, 'productId', productId);
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    updateOrderProduct(index, 'quantity', Math.max(1, quantity));
  };

  const handlePriceChange = (index: number, price: number) => {
    updateOrderProduct(index, 'totalPrice', Math.max(0, price));
  };
  
  const addProductForm = () => {
    const defaultProductId = productOptions.length > 0 ? productOptions[0].value : "";
    const defaultPrice = products.find(p => String(p.id) === defaultProductId)?.price || 0;
    
    setOrderProducts([
      ...orderProducts,
      { productId: defaultProductId, quantity: 1, totalPrice: defaultPrice }
    ]);
  };

  const removeProductForm = (index: number) => {
    if (orderProducts.length <= 1) return; // Sisain minimal 1
    setOrderProducts(orderProducts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      user_email: userEmail,
      status,
      notes,
      products: orderProducts.map(p => ({ 
        product_id: p.productId,
        quantity: p.quantity,
        total_price: p.totalPrice
      })),
    };

    try {
      const result = await addOrder(payload); 
      MySwal.fire({ title: "Success!", text: result.message, icon: "success", confirmButtonColor: "#0d6efd" });
      setUserEmail("");
      setStatus("pending");
      setNotes("");
      const defaultProductId = productOptions.length > 0 ? productOptions[0].value : "";
      const defaultPrice = products.find(p => String(p.id) === defaultProductId)?.price || 0;
      setOrderProducts([{ productId: defaultProductId, quantity: 1, totalPrice: defaultPrice }]);

    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) errorMessage = error.message;
      MySwal.fire({ title: "Oops...", text: errorMessage, icon: "error", confirmButtonColor: "#dc3545" });
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbs = [
    { label: "Order List", href: "/dashboard/orders" },
    { label: "Create Order" },
  ];

  return (
    <div className="w-100">
      <PageHeader title="Create New Order" breadcrumbs={breadcrumbs} />
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4 h-100">
              <h5 className="fw-bold mb-4">Order Information</h5>

              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label fw-semibold text-secondary small">
                  User Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="userEmail"
                  className="form-control p-3"
                  placeholder="e.g., user@gmail.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>

              <hr className="my-4" />
              
              <h5 className="fw-bold mb-3">Products</h5>
              
              {orderProducts.map((product, index) => (
                <div key={index} className="border rounded-3 p-3 mb-3 position-relative">
                  {orderProducts.length > 1 && (
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 10 }}
                      onClick={() => removeProductForm(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor={`productName-${index}`} className="form-label fw-semibold text-secondary small">
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <CustomSelect
                        id={`productName-${index}`}
                        options={productOptions}
                        value={productOptions.find((opt) => opt.value === product.productId) || null}
                        onChange={(selectedOption) => handleProductChange(index, selectedOption ? selectedOption.value : "")}
                        placeholder={!products || products.length === 0 ? "Loading..." : "Select product"}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor={`quantity-${index}`} className="form-label fw-semibold text-secondary small">
                        Quantity <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={() => handleQuantityChange(index, product.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id={`quantity-${index}`}
                          className="form-control text-center p-3"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                          min={1}
                          required
                        />
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={() => handleQuantityChange(index, product.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor={`totalPrice-${index}`} className="form-label fw-semibold text-secondary small">
                        Total Price
                      </label>
                      <input
                        type="number"
                        id={`totalPrice-${index}`}
                        className="form-control p-3"
                        placeholder="e.g., 50000"
                        value={product.totalPrice}
                        onChange={(e) => handlePriceChange(index, Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                className="btn btn-outline-primary d-flex align-items-center gap-2 mt-3" 
                onClick={addProductForm}
              >
                <Plus size={18} /> Add Another Product
              </button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-4">Order Settings</h5>

              <div className="mb-3">
                <label htmlFor="status" className="form-label fw-semibold text-secondary small">
                  Delivery Status <span className="text-danger">*</span>
                </label>
                <CustomSelect
                  id="status"
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === status)}
                  onChange={(selectedOption) => setStatus(selectedOption ? selectedOption.value : "pending")}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="notes" className="form-label fw-semibold text-secondary small">Notes</label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={8}
                  placeholder="Additional notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="d-grid">
                <SubmitButton
                  isLoading={isLoading}
                  text="Create Order"
                  loadingText="Creating Order..."
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}