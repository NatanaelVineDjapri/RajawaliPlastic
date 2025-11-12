"use client";

import React from "react";

interface BubbleTextProps {
  message: string;
  isSender: boolean;
  time: string;
}

export default function BubbleText({ message, isSender, time }: BubbleTextProps) {
  const alignmentClass = isSender ? "justify-content-end" : "justify-content-start";
  const bubbleClass = isSender ? "sender-bubble" : "receiver-bubble";

  return (
    <div className={`d-flex ${alignmentClass} mb-2`}>
      <div className={`chat-bubble ${bubbleClass}`}>
        <p className="mb-1 small text-break">{message}</p>
        <span className="bubble-time">{time}</span>
      </div>

      <style jsx>{`
        .chat-bubble {
          padding: 0.6rem 0.9rem;
          border-radius: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          word-wrap: break-word;
          overflow-wrap: break-word;
          transition: all 0.2s ease-in-out;
        }

        .sender-bubble {
          background-color: #007bff;
          color: white;
        }

        .receiver-bubble {
          background-color: #f8f9fa;
          color: #212529;
          border: 1px solid #dee2e6;
        }

        .bubble-time {
          display: block;
          text-align: right;
          font-size: 0.7rem;
          opacity: 0.75;
          margin-top: 2px;
        }

        @media (max-width: 576px) {
          .chat-bubble {
            max-width: 90%;
            min-width: 60px;
            font-size: 0.85rem;
            padding: 0.5rem 0.8rem;
          }
          .bubble-time {
            font-size: 0.65rem;
          }
        }

        @media (min-width: 577px) and (max-width: 991px) {
          .chat-bubble {
            max-width: 80%;
            font-size: 0.9rem;
          }
        }

        @media (min-width: 992px) {
          .chat-bubble {
            max-width: 65%;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}