'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PageHeader from '@/app/components/admincomponents/PageHeader';
import { getSliders, deleteSlider } from '@/services/heroService'; // pastikan service ini ada
import { Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface HeroItem {
  id: string;
  image: string;
  label?: string;
}

export default function HeroPage() {
  const pageTitle = 'Hero';
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Hero' },
  ];

  const [heroItems, setHeroItems] = useState<HeroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHero = async () => {
    setIsLoading(true);
    try {
      const result = await getSliders();
      if (result.data && Array.isArray(result.data)) {
        setHeroItems(result.data);
      }
    } catch (error: any) {
      console.error(error);
      MySwal.fire('Error', error.message || 'Failed to fetch hero items.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleRemove = (idToRemove: number) => {
    setHeroItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="w-100 px-2 px-md-4">
      <h1 className="fs-3 fw-bold text-dark mb-4">{pageTitle}</h1>

      <div className="rounded-3 p-3 p-md-4 mb-4" style={{ backgroundColor: '#C0FBFF' }}>
        <h2 className="fs-5 fw-bold" style={{ color: '#005F6B' }}>Gallery</h2>
      </div>

      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4 pb-5">
        {heroItems.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 overflow-hidden rounded-3 shadow-sm border" style={{ backgroundColor: '#f9fafb', borderColor: '#dee2e6' }}>
              <div className="bg-white p-2 p-md-3 d-flex align-items-center justify-content-center border-bottom" style={{ minHeight: '140px', height: '100%' }}>
                <Image
                  src={item.img}
                  alt={item.label}
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="card-body p-2 p-md-3 d-flex flex-column gap-2">
                <p className="card-text fw-semibold text-dark mb-1 text-center text-md-start">{item.label}</p>
                <button
                  className="btn btn-sm px-3 rounded-3 fw-medium w-100"
                  onClick={() => handleRemove(item.id)}
                  style={{ backgroundColor: '#e0e0ff', color: '#6c63ff', borderColor: '#c0bfff' }}
                >
                  <Image
                    src={item.image}
                    alt={item.label || `Hero item ${item.id}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>

                <div className="card-body p-3 d-flex flex-column">
                  {item.label && (
                    <p className="card-text fw-semibold text-dark mb-2">{item.label}</p>
                  )}
                  <div className="mt-auto">
                    <button
                      className="btn btn-sm btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-1"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
