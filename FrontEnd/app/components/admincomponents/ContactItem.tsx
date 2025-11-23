"use client";
import React from "react";

interface ContactItemProps {
  username: string;
  lastMessage: string;
  lastMessageTime?: string; // timestamp string
  isOnline: boolean;
  isSelected: boolean;
  hasUnread: boolean; // unread dari customer
  avatarUrl: string;
  onClick: () => void;
  notReplied?: boolean; // kalau admin blm bales
}

const ContactItem: React.FC<ContactItemProps> = ({
  username,
  lastMessage,
  lastMessageTime,
  isOnline,
  isSelected,
  hasUnread,
  avatarUrl,
  onClick,
  notReplied,
}) => {
  const dateObj = lastMessageTime ? new Date(lastMessageTime) : null;
  const formattedDate = dateObj?.toLocaleDateString();
  const formattedTime = dateObj?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const displayUsername = username.length > 10 ? username.slice(0, 10) + "..." : username;

  return (
    <div
      onClick={onClick}
      className={`d-flex align-items-center p-3 border-bottom hover-shadow cursor-pointer ${
        isSelected ? "bg-light" : ""
      }`}
    >
      <div className="position-relative">
        <img
          src={avatarUrl || "/images/pfp.jpg"}
          alt={username || "User Avatar"}
          width={40}
          height={40}
          className="rounded-circle object-fit-cover"
        />

        {isOnline && (
          <span
            className="position-absolute bottom-0 end-0 rounded-circle border border-white"
            style={{ width: 10, height: 10, backgroundColor: "green" }}
          ></span>
        )}
      </div>

      <div className="flex-grow-1 ms-2">
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">{displayUsername}</span>
          {lastMessageTime && (
            <small className="text-muted ms-2" style={{ fontSize: "0.7rem" }}>
              {formattedDate} {formattedTime}
            </small>
          )}
        </div>
        <div className="d-flex align-items-center">
          <span
            className="text-truncate me-2"
            style={{ maxWidth: "150px", fontSize: "0.85rem" }}
          >
            {lastMessage}
          </span>
          {notReplied && (
            <span
              className="ms-auto"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            ></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
