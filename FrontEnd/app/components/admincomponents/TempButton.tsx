import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText: string;
  form?: string;
}

export default function SubmitButton({
  isLoading,
  text,
  loadingText,
  form,
}: SubmitButtonProps) {
  return (
    <div className="d-grid w-100">
      <button
        type="submit"
        className="btn btn-primary btn-md fw-semibold w-100 text-truncate"
        disabled={isLoading}
        form={form}
      >
        {isLoading ? loadingText : text}
      </button>
      <style jsx>{`
        @media (max-width: 768px) {
          button {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
        }
        @media (max-width: 480px) {
          button {
            font-size: 0.8rem;
            padding: 0.5rem 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}