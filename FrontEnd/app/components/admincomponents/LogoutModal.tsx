"use client";

import { useRouter } from "next/navigation";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleYes = () => {
    onConfirm(); 
    router.push("http://localhost:3000/auth/login");
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div className="logout-modal bg-white p-5 rounded-3 shadow-lg text-center">
        <h3 className="fs-5 fw-bold mb-4">ARE YOU SURE ?</h3>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button 
            className="btn px-4 py-2 rounded-3 fw-bold"
            onClick={handleYes}
            style={{ backgroundColor: '#A6F5FA', color: '#005F6B' }}
          >
            YES
          </button>
          <button 
            className="btn px-4 py-2 rounded-3 fw-bold"
            onClick={onClose}
            style={{ backgroundColor: '#F8B4B4', color: '#B02A37' }}
          >
            NO
          </button>
        </div>
      </div>
      <style jsx>{`
        .logout-modal {
          width: 350px;
          max-width: 90vw;
        }
        @media (max-width: 576px) {
          .logout-modal {
            width: 80%;
            padding: 2rem;
          }
          .logout-modal h3 {
            font-size: 1rem;
          }
          .logout-modal button {
            width: 100px;
            font-size: 0.85rem;
          }
        }
        @media (min-width: 577px) and (max-width: 991px) {
          .logout-modal {
            width: 300px;
            padding: 2.5rem;
          }
          .logout-modal h3 {
            font-size: 1.1rem;
          }
          .logout-modal button {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}