"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";
import {
  fetchMessages,
  sendMessage,
  fetchMessageImage,
  MessageData,
  UserData,
} from "@/services/messageService";
import {
  fetchCurrentUserProfile,
  fetchAdminUserForChat,
} from "@/services/UserService";
import "@/utils/echo";
import Echo from "laravel-echo";

declare global {
  interface Window {
    Echo: Echo<any> | null;
  }
}

interface UIMessage {
  id: string;
  text: string;
  from: "user" | "bot";
  isTemp?: boolean;
  imageUrl?: string;
}

const formatMessageForUI = (
  msg: MessageData,
  currentUserId: string
): UIMessage => ({
  id: (msg as any).id || (msg as any)._id || String(Date.now()),
  text: msg.message,
  from: (msg as any).sender_id === currentUserId ? "user" : "bot",
  imageUrl: (msg as any).image_base64
    ? `data:image/jpeg;base64,${(msg as any).image_base64}`
    : undefined,
});

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subscribedChannelsRef = useRef<Set<string>>(new Set());

  const currentUserId = currentUser?.id ?? null;

  const scrollToBottom = useCallback(() => {
    setTimeout(
      () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const safeSubscribe = (
    channelName: string,
    handler: (event: any) => void
  ) => {
    if (!window.Echo) return;
    if (subscribedChannelsRef.current.has(channelName)) return;
    try {
      window.Echo.private(channelName)
        .listen(".MessageSent", handler)
        .error((err: any) => {
          setAuthError(`Gagal otorisasi private channel (${channelName}).`);
          console.error("Pusher Auth Error:", err);
        });
      subscribedChannelsRef.current.add(channelName);
    } catch {}
  };

  const safeUnsubscribe = (channelName: string) => {
    if (!window.Echo) return;
    try {
      window.Echo.leave(channelName);
      subscribedChannelsRef.current.delete(channelName);
    } catch {}
  };

  useEffect(() => {
    if (!currentUserId) return;

    const handleMessageReceive = (event: { message: MessageData }) => {
      const newMsg = event.message;
      const messageId = (newMsg as any).id || newMsg._id;
      const isImageMessage =
        !newMsg.message && messageId && newMsg.sender_id === adminId;

      const placeholderMsg: UIMessage = {
        id: messageId,
        text: isImageMessage ? "[Menerima gambar...]" : newMsg.message,
        from: "bot",
        isTemp: isImageMessage,
      };

      setMessages((prev) =>
        prev.some((m) => m.id === messageId) ? prev : [...prev, placeholderMsg]
      );

      if (isImageMessage) {
        fetchMessageImage(messageId)
          .then((base64Image) => {
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === messageId
                  ? {
                      ...m,
                      imageUrl: imageUrl,
                      isTemp: false,
                      text: newMsg.message,
                    }
                  : m
              )
            );
          })
          .catch((err) => {
            console.error("Gagal mengambil data gambar realtime:", err);
            setMessages((prev) =>
              prev.map((m) =>
                m.id === messageId
                  ? { ...m, text: "[Gagal memuat gambar]", isTemp: false }
                  : m
              )
            );
          });
      }
    };

    safeSubscribe(`chat.${currentUserId}`, handleMessageReceive);
    return () => safeUnsubscribe(`chat.${currentUserId}`);
  }, [currentUserId, adminId]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await fetchCurrentUserProfile();
        setCurrentUser(user);

        const admin = await fetchAdminUserForChat();
        const adminId = admin.id;
        setAdminId(adminId);

        if (user && admin.id) {
          const msgs = await fetchMessages(admin.id);
          setMessages(msgs.map((msg) => formatMessageForUI(msg, user.id)));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSend(file);
    }
    e.target.value = "";
  };

  const handleSend = async (fileToSend: File | null = null) => {
    const isSendingImage = !!fileToSend;
    const text = input.trim();

    if ((!text && !isSendingImage) || !currentUserId || !adminId) return;

    const tempId = `temp-${Date.now()}`;

    if (isSendingImage) {
      const tempMsg: UIMessage = {
        id: tempId,
        text: text || "[Mengirim gambar...]",
        from: "user",
        isTemp: true,
      };
      setMessages((prev) => [...prev, tempMsg]);
      scrollToBottom();

      try {
        const formData = new FormData();
        formData.append("image", fileToSend);
        formData.append("receiver_id", adminId);
        formData.append("message", text);

        const res = await fetch("http://localhost:8000/api/rs/messages", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");

        setInput("");

        const uiMsg = formatMessageForUI(data.data, currentUserId);
        setMessages((prev) => prev.map((m) => (m.id === tempId ? uiMsg : m)));
      } catch (e) {
        console.error("Upload image failed:", e);
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        setAuthError("Gagal mengirim gambar. Cek CORS/token.");
      }
      return;
    }

    const tempMsg: UIMessage = { id: tempId, text, from: "user", isTemp: true };
    setMessages((prev) => [...prev, tempMsg]);
    setInput("");
    scrollToBottom();

    try {
      const sent = await sendMessage(adminId, text);
      const uiMsg = formatMessageForUI(sent, currentUserId);
      setMessages((prev) => prev.map((m) => (m.id === tempId ? uiMsg : m)));
    } catch (e) {
      console.error("Error sending message:", e);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setAuthError("Gagal mengirim pesan.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (isLoading) return <div className="p-5 text-center">Memuat chat...</div>;
  if (!currentUser) return <div className="p-5 text-danger">Silakan login</div>;
  if (!adminId)
    return <div className="p-5 text-warning">Admin tidak ditemukan</div>;

  return (
    <div className="chat-box">
      {authError && (
        <div className="p-2 text-danger text-center border-bottom">
          {authError}
        </div>
      )}

      <div className="chat-inner">
        <div className="chat-messages">
          {messages
            .slice()
            .sort((a, b) => a.id.localeCompare(b.id))
            .map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${
                  msg.from === "user" ? "from-user" : "from-bot"
                }`}
              >
                <div
                  className={`message-bubble ${msg.from} ${
                    msg.isTemp ? "opacity-50" : ""
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt={msg.text.substring(0, 30)}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "250px",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                        marginBottom: msg.text.trim() ? "8px" : "0",
                      }}
                    />
                  )}

                  {msg.text && msg.text.trim() !== "[Mengirim gambar...]" && (
                    <span>{msg.text}</span>
                  )}

                  {msg.isTemp && msg.text.includes("[Mengirim gambar...]") && (
                    <span style={{ fontStyle: "italic", opacity: 0.8 }}>
                      {msg.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            className="btn-icon"
            onClick={handleImageClick}
            title="Upload Gambar"
            disabled={isLoading}
          >
            <FaPaperclip />
          </button>

          <input
            type="text"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={() => handleSend()} disabled={!input.trim()}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
