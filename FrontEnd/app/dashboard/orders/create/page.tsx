'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { addOrder } from '@/services/orderService';
import { getProducts } from '@/services/productService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PageHeader from '@/app/components/admincomponents/PageHeader';
import SubmitButton from '@/app/components/admincomponents/submitButton';
import CustomSelect, { SelectOption } from '@/app/components/admincomponents/customSelect';

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  name: string;
}

const statusOptions: SelectOption[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'proses', label: 'Processing' },
  { value: 'kirim', label: 'Shipped' },
  { value: 'selesai', label: 'Completed' },
];

export default function CreateOrderPage() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [productId, setProductId] = useState<string>(''); 
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');
  const [notes, setNotes] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productOptions, setProductOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await getProducts();
        if (result.data && Array.isArray(result.data)) {
          setProducts(result.data);
          const options = result.data.map((product: Product) => ({
            value: String(product.id),
            label: product.name
          }));
          setProductOptions(options);
          if (result.data.length > 0) {
            setProductId(String(result.data[0].id)); 
          }
        } else {
          setProducts([]);
          setProductOptions([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        MySwal.fire({
          title: 'Error Fetching',
          text: 'Failed to load product data. Please try refreshing the page.',
          icon: 'error',
        });
      }
    }
    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('user_email', userEmail);
    formData.append('product_id', productId); 
    formData.append('quantity', String(quantity));
    formData.append('total_price', totalPrice);
    formData.append('status', status);
    formData.append('notes', notes);

    try {
      const result = await addOrder(formData);
      MySwal.fire({ title: 'Success!', text: result.message, icon: 'success' });
      setUserEmail('');
      setProductId(products.length > 0 ? String(products[0].id) : '');
      setQuantity(1);
      setTotalPrice('');
      setStatus('pending');
      setNotes('');
    } catch (error) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      MySwal.fire({ title: 'Oops...', text: errorMessage, icon: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbs = [
    { label: "Order List", href: "/dashboard/orders" },
    { label: "Create Order" }
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

              <div className="mb-3">
                <label htmlFor="productName" className="form-label fw-semibold text-secondary small">
                  Product Name <span className="text-danger">*</span>
                </label>
                <CustomSelect
                  id="productName"
                  options={productOptions}
                  value={productOptions.find(opt => opt.value === productId) || null}
                  onChange={(selectedOption) => {
                    setProductId(selectedOption ? selectedOption.value : '');
                  }}
                  placeholder={(!products || products.length === 0) ? "Loading products..." : "Select a product"}
                  required
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="quantity" className="form-label fw-semibold text-secondary small">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <button 
                      className="btn btn-light" 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control text-center p-3"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      min="1"
                      required
                    />
                    <button 
                      className="btn btn-light" 
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="totalPrice" className="form-label fw-semibold text-secondary small">
                    Total Price
                  </label>
                  <input
                    type="number"
                    id="totalPrice"
                    className="form-control p-3"
                    placeholder="e.g., 50000"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4 h-60">
              <h5 className="fw-bold mb-4">Order Settings</h5>
              
              <div className="mb-3">
                <label htmlFor="status" className="form-label fw-semibold text-secondary small">
                  Delivery Status <span className="text-danger">*</span>
                </label>
                <CustomSelect
                  id="status"
                  options={statusOptions}
                  value={statusOptions.find(opt => opt.value === status)}
                  onChange={(selectedOption) => {
                    setStatus(selectedOption ? selectedOption.value : 'pending');
                  }}
                  required
                />
              </div>

              <div>
                <label htmlFor="notes" className="form-label fw-semibold text-secondary small">
                  Notes
                </label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={6}
                  placeholder="Additional notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
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
      </form>
    </div>
  );
}