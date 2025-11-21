'use client';
import React from "react";

interface ChatPageSkeletonProps {
  contactsCount?: number;
  messagesCount?: number;
}

const ChatPageSkeleton: React.FC<ChatPageSkeletonProps> = ({
  contactsCount = 5,
  messagesCount = 6,
}) => {
  return (
    <>
      {/* KIRI: Sidebar / Daftar Chat (Sesuai col-lg-3) */}
      <div className="col-12 col-lg-3 border-end p-0 d-flex flex-column bg-white h-100">
        
        {/* Header Sidebar ("Daftar Chat") */}
        <div className="p-3 border-bottom d-flex align-items-center" style={{ height: "60px" }}>
          <div
            className="rounded"
            style={{
              width: "50%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>

        {/* List Kontak */}
        <div className="flex-grow-1 overflow-hidden">
          {Array.from({ length: contactsCount }).map((_, idx) => (
            <div
              key={idx}
              className="p-3 border-bottom d-flex align-items-start position-relative"
            >
              {/* Avatar */}
              <div
                className="rounded-circle flex-shrink-0"
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: "#e0e0e0",
                  marginRight: 15,
                  animation: "pulse 1.5s infinite",
                }}
              />
              
              {/* Info User (Nama & Chat Preview) */}
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                {/* Baris 1: Nama & Tanggal */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                   {/* Nama */}
                   <div
                    className="rounded"
                    style={{
                      width: "40%",
                      height: "16px",
                      backgroundColor: "#e0e0e0",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  {/* Tanggal (Pojok Kanan) */}
                  <div
                    className="rounded"
                    style={{
                      width: "20%",
                      height: "12px",
                      backgroundColor: "#f0f0f0", // Lebih terang dikit
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                </div>

                {/* Baris 2: Preview Chat */}
                <div
                  className="rounded"
                  style={{
                    width: "70%",
                    height: "12px",
                    backgroundColor: "#f0f0f0",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KANAN: Chat Window (Sesuai col-lg-9) */}
      <div className="col-12 col-lg-9 p-0 d-flex flex-column bg-white h-100">
        
        {/* Header Chat Window (Nama User & Avatar) */}
        <div className="p-3 border-bottom d-flex align-items-center bg-white" style={{ height: "60px" }}>
           <div
            className="rounded-circle"
            style={{
              width: 35,
              height: 35,
              backgroundColor: "#e0e0e0",
              marginRight: 12,
              animation: "pulse 1.5s infinite",
            }}
          />
          <div
            className="rounded"
            style={{
              width: "200px",
              height: "18px",
              backgroundColor: "#e0e0e0",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>

        {/* Area Chat Bubble */}
        <div
          className="flex-grow-1 p-4 d-flex flex-column justify-content-end overflow-hidden"
          style={{ backgroundColor: "#f8f9fa" }} // Warna background chat area (agak abu muda)
        >
          {Array.from({ length: messagesCount }).map((_, idx) => {
             const isMe = idx % 2 !== 0; // Selang seling (Kiri/Kanan)
             return (
                <div
                  key={idx}
                  className={`d-flex mb-3 w-100 ${isMe ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    className={`rounded-3 p-3`}
                    style={{
                      width: `${Math.floor(Math.random() * 30 + 20)}%`, // Panjang random
                      height: 45,
                      backgroundColor: "#e0e0e0", 
                      opacity: isMe ? 0.8 : 0.5, // Chat sendiri sedikit lebih gelap
                      borderRadius: "10px",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                </div>
             );
          })}
        </div>

        {/* Input Area (Footer) */}
        <div className="p-3 border-top bg-white d-flex align-items-center">
          {/* Text Input Box */}
          <div
            className="rounded flex-grow-1"
            style={{
              height: 45,
              backgroundColor: "#f0f2f5", // Warna input box
              marginRight: 10,
              animation: "pulse 1.5s infinite",
              border: "1px solid #ddd"
            }}
          />
          {/* Send Button */}
          <div
            className="rounded"
            style={{
              width: 45,
              height: 45,
              backgroundColor: "#e0e0e0",
              animation: "pulse 1.5s infinite",
            }}
          />
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatPageSkeleton;