import Image from 'next/image';
import { Dot } from 'lucide-react';

interface ContactItemProps {
  username: string;
  lastMessage: string;
  isActive: boolean;
  isOnline: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const AVATAR_SRC = "/images/avatarplaceholder.png";

export default function ContactItem({
  username,
  lastMessage,
  isActive,
  isOnline,
  isSelected,
  onClick,
}: ContactItemProps) {
  const selectedClass = isSelected 
    ? 'bg-info-subtle border-start border-3 border-info' 
    : 'bg-white';
  
  return (
    <div
      className={`d-flex align-items-center gap-3 p-3 rounded-0 ${selectedClass}`}
      style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
      onClick={onClick}
    >
      <div className="position-relative">
        <Image
          src={AVATAR_SRC}
          alt={`${username} Avatar`}
          width={40}
          height={40}
          className="rounded-circle object-fit-cover"
        />
        {isOnline && (
          <Dot 
            size={20} 
            className="position-absolute bottom-0 end-0 bg-white rounded-circle p-0"
            style={{ color: '#9c27b0' }}
          />
        )}
      </div>

      <div className="d-flex flex-column flex-grow-1">
        <span className="fw-semibold text-dark">{username}</span>
        <span className={`small text-muted text-truncate ${isActive ? 'fw-bold text-dark' : ''}`}>
          {lastMessage}
        </span>
      </div>
      
      {isActive && (
        <div className="ms-auto">
          <div className="rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: '#9c27b0' }}></div>
        </div>
      )}
    </div>
  );
}