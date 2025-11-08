interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div 
        className="bg-white p-5 rounded-3 shadow-lg text-center"
        style={{ width: '350px', maxWidth: '90vw' }}
      >
        <h3 className="fs-5 fw-bold mb-4">ARE YOU SURE ?</h3>
        <div className="d-flex justify-content-center gap-3">
          <button 
            className="btn px-4 py-2 rounded-3 fw-bold"
            onClick={onConfirm}
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
    </div>
  );
}
