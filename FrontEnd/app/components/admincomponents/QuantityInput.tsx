'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface QuantityInputProps {
  defaultValue?: number;
  min?: number;
  max?: number;
}

export default function QuantityInput({
  defaultValue = 1,
  min = 1,
  max = 9999,
}: QuantityInputProps) {
  const [value, setValue] = useState(defaultValue);
  const increment = () => setValue((prev) => (prev < max ? prev + 1 : prev));
  const decrement = () => setValue((prev) => (prev > min ? prev - 1 : prev));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num)) setValue(min);
    else if (num < min) setValue(min);
    else if (num > max) setValue(max);
    else setValue(num);
  };

  return (
    <div className="quantity-wrapper d-flex align-items-center border rounded-3 bg-light overflow-hidden">
      <input
        type="number"
        className="form-control flex-grow-1 border-0 shadow-none bg-transparent text-dark p-2 text-center"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <div className="border-start align-self-stretch"></div>
      <div className="d-flex flex-column">
        <button type="button" onClick={increment} className="btn btn-link text-muted py-1 px-2 rounded-0">
          <ChevronUp size={16} />
        </button>
        <button type="button" onClick={decrement} className="btn btn-link text-muted py-1 px-2 rounded-0">
          <ChevronDown size={16} />
        </button>
      </div>

      <style jsx>{`
        .quantity-wrapper {
          width: 120px;
        }
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
          font-size: 0.875rem;
        }
        .btn-link {
          text-decoration: none;
          box-shadow: none;
        }
        .btn-link:hover {
          background-color: #f3f4f6;
        }
        @media (max-width: 576px) {
          .quantity-wrapper {
            width: 90px;
          }
          input[type='number'] {
            font-size: 0.75rem;
            padding: 0.4rem;
          }
          .btn-link {
            padding: 0.25rem;
          }
        }
        @media (min-width: 577px) and (max-width: 991px) {
          .quantity-wrapper {
            width: 100px;
          }
          input[type='number'] {
            font-size: 0.8rem;
            padding: 0.45rem;
          }
        }
      `}</style>
    </div>
  );
}