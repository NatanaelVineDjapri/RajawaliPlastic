'use client';
import React from 'react';

const UserListItemSkeleton = () => {
  return (
    <div
      className="d-flex align-items-center p-3 rounded-3 mb-3 w-100"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="skeleton-avatar me-3"></div>
      <div className="flex-grow-1">
        <div className="skeleton-line mb-1"></div>
        <div className="skeleton-line w-50"></div>
      </div>
      <div className="ms-3">
        <div className="skeleton-button"></div>
      </div>

      <style jsx>{`
        .skeleton-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e0e0;
          position: relative;
          overflow: hidden;
        }
        .skeleton-line {
          height: 12px;
          background: #e0e0e0;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .skeleton-button {
          width: 80px;
          height: 32px;
          border-radius: 12px;
          background: #e0e0e0;
          position: relative;
          overflow: hidden;
        }
        /* shimmer animation */
        .skeleton-avatar::before,
        .skeleton-line::before,
        .skeleton-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default UserListItemSkeleton;
