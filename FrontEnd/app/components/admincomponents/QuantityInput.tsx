'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './QuantityInput.module.css';

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
  // 1. Pastikan state-nya adalah 'number', bukan string
  const [value, setValue] = useState(defaultValue);

  const increment = () => {
    setValue((prev) => (prev < max ? prev + 1 : prev));
  };

  const decrement = () => {
    setValue((prev) => (prev > min ? prev - 1 : prev));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const  num = parseInt(e.target.value, 10);
    if (isNaN(num)) {
      setValue(min);
    } else if (num < min) {
      setValue(min);
    } else if (num > max) {
      setValue(max);
    } else {
      setValue(num);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
      <div className={styles.divider}></div>
      <div className={styles.buttonWrapper}>
        <button type="button" onClick={increment} className={styles.button}>
          <ChevronUp size={16} />
        </button>
        <button type="button" onClick={decrement} className={styles.button}>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}