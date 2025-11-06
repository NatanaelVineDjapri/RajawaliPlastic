'use client';

import React from 'react';

// Tipe untuk props
interface SubmitButtonProps {
  isLoading: boolean;
  text: string; // Teks normal (cth: "Create Order")
  loadingText: string; // Teks pas loading (cth: "Creating Order...")
}

export default function SubmitButton({ isLoading, text, loadingText }: SubmitButtonProps) {
  return (
    <div className="d-grid">
      <button 
        type="submit" 
        // Kita pakai btn-primary (biru) sebagai default
        className="btn btn-primary btn-md fw-semibold"
        disabled={isLoading}
      >
        {isLoading ? loadingText : text}
      </button>
    </div>
  );
}