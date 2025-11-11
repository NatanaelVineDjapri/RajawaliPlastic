import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  form?: string; 
}

export default function SubmitButton({ isLoading, text, loadingText, form }: SubmitButtonProps) {
  return (
    <div className="d-grid">
      <button 
        type="submit" 
        className="btn btn-primary btn-md fw-semibold"
        disabled={isLoading}
        form={form} 
      >
        {isLoading ? loadingText : text}
      </button>
    </div>
  );
}