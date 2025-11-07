'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Camera, Upload } from 'lucide-react';
import PageHeader from '@/app/components/admincomponents/PageHeader';
import SubmitButton from '@/app/components/admincomponents/SubmitButton';
import { addGallery } from '@/services/galleryService'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Image from 'next/image';
import Link from 'next/link';

const MySwal = withReactContent(Swal);

export default function UploadGalleryPage() {
  const pageTitle = "Upload Gallery Item";

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs = [
    { label: "Gallery List", href: "/dashboard/gallery" },
    { label: "Upload Item" },
  ];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    
    if (imageFile) {
      formData.append('image', imageFile); 
    } else {
      MySwal.fire('Error', 'Please select an image file.', 'warning');
      setIsLoading(false);
      return;
    }

    try {
      const result = await addGallery(formData);
      MySwal.fire('Success!', result.message || 'Gallery item added successfully!', 'success');
      
      setTitle('');
      setDescription('');
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

    } catch (error) {
      let msg = 'An unknown error occurred.';
      if (error instanceof Error) msg = error.message;
      MySwal.fire('Oops...', msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-100">
      <PageHeader title={pageTitle} breadcrumbs={breadcrumbs} />

      <form onSubmit={handleSubmit} className="bg-white rounded-3 shadow p-4 mb-4">
        
        {/* ROW UTAMA: Memisahkan Image Details dan Uploader */}
        <div className="row g-4">
            
          {/* KOLOM KIRI: Image Details */}
          <div className="col-lg-6">
            <h5 className="fw-bold mb-3 text-secondary">Image Details</h5>
            
            <div className="d-flex flex-column gap-3 h-100">
              
              <div className="mb-3">
                <label htmlFor="title" className="form-label small fw-medium text-secondary mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control p-3 border rounded-3 bg-light"
                  placeholder="e.g., Plastic Factory Visit 2024"
                  style={{ fontSize: "0.875rem" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="description" className="form-label small fw-medium text-secondary mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control p-3 border rounded-3 bg-light"
                  placeholder="A brief description of this gallery item (optional)"
                  rows={4}
                  style={{
                    fontSize: "0.875rem",
                    resize: "vertical",
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Uploader & Preview */}
          <div className="col-lg-6">
            <h5 className="fw-bold mb-3 text-secondary">Upload Image</h5>
            
            <label 
              htmlFor="imageFile"
              className="d-flex flex-column align-items-center justify-content-center border-dashed border-2 border-secondary-subtle bg-light rounded-3 p-4 h-100"
              style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
            >
              
              {previewUrl ? (
                <Image 
                  src={previewUrl} 
                  alt="Image Preview" 
                  width={400} 
                  height={300} 
                  style={{ objectFit: 'contain', borderRadius: '4px' }} 
                />
              ) : (
                <div className="text-muted text-center">
                    <Camera size={48} className="mb-2" />
                    <p className="small">Click to upload image file (Max 2MB)</p>
                </div>
              )}
              
              <input
                type="file"
                id="imageFile"
                className="d-none"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </label>
          </div>
          
        </div>
        
        {/* BARIS BARU untuk Tombol Submit (ALIGN BAWAH KANAN) */}
        <div className="d-flex justify-content-end pt-3 mt-4 border-top">
          <SubmitButton
            isLoading={isLoading}
            text="Add Gallery Item"
            loadingText="Saving Item..."
          />
        </div>

      </form>
    </div>
  );
}