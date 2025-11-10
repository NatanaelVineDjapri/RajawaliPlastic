import Image from "next/image";
import { Dot } from "lucide-react";

interface ContactItemProps {
  username: string;
  lastMessage: string;
  isOnline: boolean;
  isSelected: boolean;
  hasUnread: boolean;
  onClick: () => void;
}

const AVATAR_SRC = "/images/avatarplaceholder.png";

export default function ContactItem({
  username,
  lastMessage,
  isOnline,
  isSelected,
  hasUnread,
  onClick,
}: ContactItemProps) {
  const selectedClass = isSelected
    ? "bg-info-subtle border-start border-3 border-info"
    : "bg-white";

  return (
    <div
      className={`d-flex align-items-center gap-3 p-3 rounded-0 ${selectedClass}`}
      style={{ cursor: "pointer", transition: "background-color 0.2s" }}
      onClick={onClick}
    >
      <div className="position-relative avatar-container">
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
            style={{ color: "#9c27b0" }}
          />
        )}
      </div>

      <div className="d-flex flex-column flex-grow-1 text-container">
        <span className="fw-semibold text-dark username-text">{username}</span>
        <span
          className={`small text-muted text-truncate ${
            hasUnread ? "fw-bold text-dark" : ""
          }`}
        >
          {lastMessage}
        </span>
      </div>

      {hasUnread && (
        <div className="ms-auto">
          <div
            className="rounded-circle"
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#9c27b0",
            }}
          ></div>
        </div>
      )}

      <style jsx>{`
        .avatar-container {
          flex-shrink: 0;
        }

        .text-container {
          min-width: 0;
        }

        .username-text {
          font-size: 0.95rem;
        }

        @media (max-width: 576px) {
          .avatar-container :global(img) {
            width: 32px !important;
            height: 32px !important;
          }
          .text-container span {
            font-size: 0.8rem !important;
          }
          .username-text {
            font-size: 0.85rem !important;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .avatar-container :global(img) {
            width: 36px !important;
            height: 36px !important;
          }
          .username-text {
            font-size: 0.9rem !important;
          }
          .text-container span {
            font-size: 0.85rem !important;
          }
        }

        @media (min-width: 992px) {
          .avatar-container :global(img) {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}