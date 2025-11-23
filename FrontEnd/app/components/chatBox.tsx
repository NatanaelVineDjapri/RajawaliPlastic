"use client";
import React, { useState, useRef, useEffect, useCallback, } from "react";
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
import { useRouter } from "next/navigation"
import ChatUserSkeleton from "./skeletons/ChatUserSkeleton";

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
  const router = useRouter();
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

  useEffect(() => {
    if (!isLoading && !currentUser) {
      const timer = setTimeout(() => {
        router.push("/auth/login"); 
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [isLoading, currentUser, router]);

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

        const res = await fetch("https://rajawaliplastic.onrender.com/api/rs/messages", {
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
  const centerContainerClass = "d-flex flex-column align-items-center justify-content-center p-5";
  const cardStyle = { 
    backgroundColor: "white", 
    padding: "70px 70px", 
    borderRadius: "12px", 
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center" as const
  };

  if (isLoading) {
   return <ChatUserSkeleton />;
  }
 const backgroundStyle: React.CSSProperties = {
      backgroundImage: "url('/images/Background_Hero.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      
      // GANTI DARI RELATIVE KE FIXED
      position: "fixed", 
      top: 0,
      left: 0,
      width: "100vw",    // Paksa lebar full layar
      height: "100vh",   // Paksa tinggi full layar
      zIndex: 2,      // Pastikan angka ini tinggi biar di atas Navbar
      overflow: "hidden" // Cegah scroll
  };
  if (!currentUser) {
    return (
      <div style={backgroundStyle}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            backdropFilter: "blur(4px)",           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            className="bg-white p-5 rounded-4 shadow text-center"
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <div className="mb-3 text-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
              </svg>
            </div>
            
            <h3 className="text-danger fw-bold mb-3">Akses Ditolak</h3>
            <p className="text-muted mb-4">
              Silakan login terlebih dahulu untuk mengakses fitur ini.
            </p>
            
            <div className="d-inline-flex align-items-center justify-content-center text-secondary bg-light px-4 py-2 rounded-pill border">
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <small className="fw-bold">Mengalihkan ke Login...</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!adminId) {
    return (
      <div className={centerContainerClass} style={{ height: "100%" }}>
        <div style={cardStyle}>
          <h5 className="text-warning mb-2">Admin Offline</h5>
          <p className="text-muted mb-0">Maaf, admin tidak ditemukan saat ini. Coba lagi nanti.</p>
        </div>
      </div>
    );
  }

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
