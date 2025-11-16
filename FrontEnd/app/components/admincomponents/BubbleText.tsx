"use client";

import React from "react";
import Image from "next/image";

interface BubbleTextProps {
    message: string;
    isSender: boolean;
    time: string;
    imageUrl?: string | null;
}

export default function BubbleText({ message, isSender, time, imageUrl }: BubbleTextProps) {
    const alignmentClass = isSender ? "justify-content-end" : "justify-content-start";
    const bubbleClass = isSender ? "sender-bubble" : "receiver-bubble";
    const hasText = message && message.trim().length > 0;

    return (
        <div className={`d-flex ${alignmentClass} mb-2`}>
            <div className={`chat-bubble ${bubbleClass}`}>
                {imageUrl && (
                    <div className="message-image-container mb-2">
                        <Image
                            src={imageUrl}
                            alt="Pesan gambar"
                            width={300}
                            height={200}
                            className="img-fluid rounded"
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                display: "block",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                )}

                {(hasText || imageUrl) && (
                    <p
                        className="mb-1 small text-break"
                        style={{ marginTop: imageUrl && !hasText ? "-5px" : "0" }}
                    >
                        {message}
                    </p>
                )}

                <span className="bubble-time">{time}</span>

                <style jsx>{`
                    .chat-bubble {
                        padding: 0.6rem 0.9rem;
                        border-radius: 1rem;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                        transition: all 0.2s ease-in-out;
                    }

                    .message-image-container {
                        max-width: 250px;
                        margin-bottom: ${hasText ? "0.5rem" : "0"};
                        overflow: hidden;
                        border-radius: 0.5rem;
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
                        color: ${isSender
                            ? "rgba(255, 255, 255, 0.75)"
                            : "rgba(33, 37, 41, 0.75)"};
                    }

                    @media (max-width: 576px) {
                        .chat-bubble {
                            max-width: 90%;
                            min-width: 60px;
                            font-size: 0.85rem;
                            padding: 0.5rem 0.8rem;
                        }
                        .message-image-container {
                            max-width: 200px;
                        }
                        .bubble-time {
                            font-size: 0.65rem;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}
