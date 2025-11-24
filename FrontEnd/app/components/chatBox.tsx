"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
  fetchMessages,
  sendMessage,
  MessageData,
  UserData,
} from "@/services/messageService";
import {
  fetchCurrentUserProfile,
  fetchAdminUserForChat,
} from "@/services/UserService";
import "@/utils/echo";
import { useRouter } from "next/navigation";
import ChatUserSkeleton from "./skeletons/ChatUserSkeleton";

/* ============================================================
    WA-STYLE TIME FORMAT
    ============================================================ */

const formatTimestamp = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  const time = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return time;
  if (isYesterday) return `Kemarin, ${time}`;

  return `${d.toLocaleDateString("id-ID")} ${time}`;
};

/* ============================================================
    DATE HEADER FORMAT (WA STYLE)
    ============================================================ */

const formatDateHeader = (dateStr: string) => {
  const d = new Date(dateStr);

  const day = d.getDate();
  const month = d.toLocaleString("id-ID", { month: "long" });
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

interface UIMessage {
  id: string;
  text: string;
  from: "user" | "bot";
  timestamp: string;
  createdAtRaw: string;
  isTemp?: boolean;
}

const formatMessageForUI = (
  msg: MessageData,
  currentUserId: string
): UIMessage => ({
  id: msg._id || String(Date.now()),
  text: msg.message,
  from: msg.sender_id === currentUserId ? "user" : "bot",
  timestamp: formatTimestamp(msg.created_at),
  createdAtRaw: msg.created_at,
});

/* ============================================================
    GROUPING BY YYYY-MM-DD (AMAN)
    ============================================================ */

const groupMessagesByDate = (msgs: UIMessage[]) => {
  const groups: Record<string, UIMessage[]> = {};

  msgs.forEach((msg) => {
    // Gunakan format stabil untuk grouping
    const d = new Date(msg.createdAtRaw);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    if (!groups[key]) groups[key] = [];
    groups[key].push(msg);
  });

  return groups;
};

const ChatBox: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = currentUser?.id ?? null;

  const scrollToBottom = useCallback(() => {
    setTimeout(
      () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  }, []);

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      const timer = setTimeout(() => router.push("/auth/login"), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, currentUser, router]);


  useEffect(() => {
    if (!currentUserId) return;

    if (!window.Echo) return;

    window.Echo.private(`chat.${currentUserId}`).listen(
      ".MessageSent",
      (event: any) => {
        const uiMsg = formatMessageForUI(event.message, currentUserId);
        setMessages((prev) =>
          prev.some((m) => m.id === uiMsg.id) ? prev : [...prev, uiMsg]
        );
      }
    );

    return () => {
      if (window.Echo) window.Echo.leave(`chat.${currentUserId}`);
    };
  }, [currentUserId]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await fetchCurrentUserProfile();
        setCurrentUser(user);

        const admin = await fetchAdminUserForChat();
        setAdminId(admin.id);

        if (user && admin.id) {
          const msgs = await fetchMessages(admin.id);
          setMessages(msgs.map((m) => formatMessageForUI(m, user.id)));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !currentUserId || !adminId) return;

    const tempId = `temp-${crypto.randomUUID()}`;

    const tempMsg: UIMessage = {
      id: tempId,
      text,
      from: "user",
      timestamp: formatTimestamp(new Date().toISOString()),
      createdAtRaw: new Date().toISOString(),
      isTemp: true,
    };

    setMessages((prev) => [...prev, tempMsg]);
    setInput("");

    try {
      const sent = await sendMessage(adminId, text);
      const uiMsg = formatMessageForUI(sent, currentUserId);

      setMessages((prev) => prev.map((m) => (m.id === tempId ? uiMsg : m)));
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setAuthError("Gagal mengirim pesan.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (isLoading) return <ChatUserSkeleton />;

  const grouped = groupMessagesByDate(messages);

  return (
    <div className="chat-box">
      {authError && (
        <div className="p-2 text-danger text-center">{authError}</div>
      )}

      <div className="chat-inner">
        <div className="chat-messages">
          {Object.entries(grouped)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([key, msgs]) => (
              <div key={key}>
                <div className="d-flex justify-content-center my-2">
                  <span className="badge bg-white text-dark px-3 py-2 m-3">
                    {formatDateHeader(msgs[0].createdAtRaw)}
                  </span>
                </div>

                {msgs
                  .sort(
                    (a, b) =>
                      new Date(a.createdAtRaw).getTime() -
                      new Date(b.createdAtRaw).getTime()
                  )
                  .map((msg) => (
                    <div
                      key={`${msg.id}-${msg.createdAtRaw}`}
                      className={`message-row ${
                        msg.from === "user" ? "from-user" : "from-bot"
                      }`}
                    >
                      <div
                        className={`message-bubble ${msg.from} ${
                          msg.isTemp ? "opacity-50" : ""
                        }`}
                      >
                        <span>{msg.text}</span>
                        <div className="timestamp">{msg.timestamp}</div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSend} disabled={!input.trim()}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
