'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Camera } from 'lucide-react';
import QuantityInput from '@/app/components/admincomponents/QuantityInput';
import { addProduct } from '@/services/productService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const buttonActiveStyle = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'background-color 0.2s ease',
};

const buttonDisabledStyle = {
  backgroundColor: '#f3f4f6',
  color: '#9ca3af',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '0.5rem',
  fontWeight: 600,
  fontSize: '0.875rem',
  cursor: 'not-allowed',
};

const formInputStyle = {
  fontSize: '0.875rem',
  padding: '0.75rem',
  borderRadius: '0.5rem',
};

export default function CreateProductPage() {
  const pageTitle = 'Add Product';

  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', String(quantity));
    if (image) {
      formData.append('image', image);
    }

    try {
      const result = await addProduct(formData);
      MySwal.fire({
        title: 'Berhasil!',
        text: `Sukses: ${result.message}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });

      setProductName('');
      setPrice('');
      setDescription('');
      setQuantity(1);
      setImage(null);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
    } catch (error) {
      let errorMessage = 'Terjadi kesalahan tidak diketahui.';
      if (error instanceof Error) {
        errorMessage = `Gagal: ${error.message}`;
      }
      MySwal.fire({
        title: 'Oops...',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <h1 className="fs-3 fw-semibold text-dark mb-4">{pageTitle}</h1>
      <div className="bg-white rounded-3 shadow p-4 mb-4">
        <form className="d-flex gap-4" onSubmit={handleSubmit}>
          <label
            className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 text-muted small"
            style={{
              flex: '0 0 250px',
              height: '250px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderColor: '#d1d5db',
              overflow: 'hidden',
            }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-3"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Camera size={48} className="text-secondary mb-2" />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/jpg,image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
            />
          </label>

          <div className="d-flex flex-column gap-3 flex-grow-1">
            <div className="d-flex flex-column">
              <label htmlFor="productName" className="form-label small fw-medium text-secondary mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="form-control bg-light text-dark"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                style={formInputStyle}
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="price" className="form-label small fw-medium text-secondary mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="form-control bg-light text-dark"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                style={formInputStyle}
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="description" className="form-label small fw-medium text-secondary mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="form-control bg-light text-dark"
                placeholder="Enter product description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...formInputStyle, resize: 'vertical' }}
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="quantity" className="form-label small fw-medium text-secondary mb-1">
                Configure quantity
              </label>
              <QuantityInput defaultValue={quantity} />
            </div>

            <button
              type="submit"
              className="mt-3 align-self-end"
              disabled={isLoading}
              style={isLoading ? buttonDisabledStyle : buttonActiveStyle}
              onMouseOver={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#1d4ed8';
              }}
              onMouseOut={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#2563eb';
              }}
            >
              {isLoading ? 'Menyimpan...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}