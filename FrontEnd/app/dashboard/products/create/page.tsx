"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./CreateProductPage.module.css";
import { Camera } from "lucide-react";
import QuantityInput from "@/app/components/admincomponents/QuantityInput";
import { addProduct } from "@/services/productService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CreateProductPage() {
  const pageTitle = "Add Product";

  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", String(quantity));
    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await addProduct(formData);
      MySwal.fire({
        title: "Berhasil!",
        text: `Sukses: ${result.message}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      setProductName("");
      setPrice("");
      setDescription("");
      setQuantity(1);
      setImage(null);
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
      }
    } catch (error) {
      let errorMessage = "Terjadi kesalahan tidak diketahui.";
      if (error instanceof Error) {
        errorMessage = `Gagal: ${error.message}`;
      }
      MySwal.fire({
        title: "Oops...",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      <div className={styles.formContainer}>
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <label className={styles.imageUploader}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <Camera size={48} className={styles.cameraIcon} />
            )}

            <input
              type="file"
              onChange={handleImageChange}
              accept="image/jpg,image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
            />
          </label>

          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="productName" className={styles.label}>
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className={styles.input}
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                Price
              </label>
              <input
                type="number"
                id="price"
                className={styles.input}
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Enter product description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="quantity" className="form-label small fw-medium text-secondary mb-1">
                Configure quantity
              </label>
              <QuantityInput
                defaultValue={quantity}
                // onChange={setQuantity}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Menyimpan..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
