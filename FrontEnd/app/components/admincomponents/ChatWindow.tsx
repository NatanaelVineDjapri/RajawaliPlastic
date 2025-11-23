"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FaPaperPlane,
  FaArrowLeft,
  FaUserCircle,
} from "react-icons/fa";
import {
  fetchMessages,
  sendMessage,
  MessageData,
} from "@/services/messageService";
import "@/utils/echo";
import { ChatContact } from "./ChatContactList";

interface ChatWindowProps {
  activeContact: ChatContact | undefined;
  ADMIN_ID: string;
  isMobile: boolean;
  handleBackToContacts: () => void;
  setContacts: React.Dispatch<React.SetStateAction<ChatContact[]>>;
}

interface UIMessage {
  id: string;
  text: string;
  from: "admin" | "customer";
  timestamp?: number;
  isTemp?: boolean;
}

const formatMessageForUI = (msg: MessageData, adminId: string): UIMessage => ({
  id: (msg as any).id || msg._id,
  text: msg.message,
  from: msg.sender_id === adminId ? "admin" : "customer",
  timestamp: msg.created_at ? new Date(msg.created_at).getTime() : Date.now(),
});

const ChatWindow: React.FC<ChatWindowProps> = ({
  activeContact,
  ADMIN_ID,
  isMobile,
  handleBackToContacts,
  setContacts,
}) => {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const receiverId = activeContact?.userId;
  const [fetchError, setFetchError] = useState<string | null>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const loadMessages = useCallback(
    async (id: string) => {
      if (!id) return;
      setMessages([]);
      setIsLoadingMessages(true);
      setFetchError(null);
      try {
        const apiMessages = await fetchMessages(id);
        const formatted = apiMessages.map((m) =>
          formatMessageForUI(m, ADMIN_ID)
        );
        setMessages(formatted);
        scrollToBottom();
      } catch {
        setFetchError("Gagal memuat histori chat. Cek koneksi API.");
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [ADMIN_ID, scrollToBottom]
  );

  useEffect(() => {
    if (receiverId) loadMessages(receiverId);
  }, [receiverId, loadMessages]);

  useEffect(() => {
    if (!receiverId || !ADMIN_ID || typeof window === "undefined" || !window.Echo)
      return;

    const channel = `chat.${ADMIN_ID}`;
    window.Echo.leave(channel);

    window.Echo.private(channel).listen(
      ".MessageSent",
      (event: { message: MessageData }) => {
        const newMsg = event.message;

        if (
          newMsg.sender_id === receiverId &&
          newMsg.receiver_id === ADMIN_ID
        ) {
          const uiMsg = formatMessageForUI(newMsg, ADMIN_ID);

          setMessages((prev) =>
            prev.some((m) => m.id === uiMsg.id) ? prev : [...prev, uiMsg]
          );

          setContacts((prev) =>
            prev.map((c) =>
              c.userId === receiverId
                ? { ...c, lastMessageText: newMsg.message, unreadCount: 0 }
                : c
            )
          );
        }
      }
    );

    return () => window.Echo?.leave(channel);
  }, [receiverId, ADMIN_ID, setContacts]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !receiverId) return;

    const tempId = `temp-${Date.now()}`;
    const tempMsg: UIMessage = {
      id: tempId,
      text,
      from: "admin",
      isTemp: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, tempMsg]);
    setInput("");
    scrollToBottom();

    try {
      const sent = await sendMessage(receiverId, text);
      const uiMsg = formatMessageForUI(sent, ADMIN_ID);

      setMessages((prev) => prev.map((m) => (m.id === tempId ? uiMsg : m)));

      setContacts((prev) =>
        prev.map((c) =>
          c.userId === receiverId ? { ...c, lastMessageText: sent.message } : c
        )
      );
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (!activeContact) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center text-muted">
        Pilih kontak untuk memulai chat
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light p-3 border-bottom d-flex align-items-center flex-shrink-0">
        {isMobile && (
          <FaArrowLeft
            onClick={handleBackToContacts}
            className="me-3"
            style={{ cursor: "pointer" }}
          />
        )}
        <FaUserCircle size={30} className="text-gray-400 me-2" />
        <h5 className="mb-0 fw-bold">{activeContact.name}</h5>
      </div>

      <div
        className="chat-messages-container flex-grow-1 overflow-y-auto p-3"
        style={{ background: "#f5f7fa" }}
      >
        {isLoadingMessages ? (
          <div className="text-center text-muted mt-5">Memuat riwayat...</div>
        ) : (
          messages
            .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
            .map((msg, index, arr) => {
              const msgDate = new Date(msg.timestamp || 0);
              const prevDate =
                index > 0 ? new Date(arr[index - 1].timestamp || 0) : null;
              const isNewDay =
                !prevDate || msgDate.toDateString() !== prevDate.toDateString();

              return (
                <React.Fragment key={msg.id}>
                  {isNewDay && (
                    <div className="text-center text-muted my-2">
                      {msgDate.toLocaleDateString()}
                    </div>
                  )}
                  <div
                    className={`d-flex mb-3 ${
                      msg.from === "admin"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded shadow-sm ${
                        msg.from === "admin"
                          ? "bg-primary text-white"
                          : "bg-white text-dark"
                      }`}
                      style={{
                        maxWidth: "75%",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        opacity: msg.isTemp ? 0.6 : 1,
                      }}
                    >
                      <div>{msg.text}</div>

                      <div
                        className="text-end mt-1"
                        style={{ fontSize: "0.7rem", opacity: 0.7 }}
                      >
                        {msgDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-top d-flex flex-shrink-0 bg-white">
        <input
          type="text"
          className="form-control me-2"
          placeholder={`Balas ${activeContact.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoadingMessages || !activeContact}
        />

        <button
          className="btn btn-primary"
          onClick={handleSend}
          disabled={!input.trim() || isLoadingMessages || !activeContact}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
