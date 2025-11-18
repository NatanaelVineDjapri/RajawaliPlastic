'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { fetchMessages, sendMessage, MessageData, UserData } from '@/services/messageService';
import { fetchCurrentUserProfile, fetchAdminUserForChat } from '@/services/UserService';
import "@/utils/echo";

declare global {
    interface Window { Echo: any; }
}

interface UIMessage {
    id: string;
    text: string;
    from: 'user' | 'bot';
    isTemp?: boolean;
}

const formatMessageForUI = (msg: MessageData, currentUserId: string): UIMessage => ({
    id: (msg as any).id || (msg as any)._id || String(Date.now()),
    text: msg.message,
    from: (msg as any).sender_id === currentUserId ? 'user' : 'bot',
});

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<UIMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);
    const [adminId, setAdminId] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const subscribedChannelsRef = useRef<Set<string>>(new Set());

    const currentUserId = currentUser?.id ?? null;

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

    const safeSubscribe = (channelName: string, handler: (event: any) => void) => {
        if (!window.Echo) return;
        if (subscribedChannelsRef.current.has(channelName)) return;

        try {
            window.Echo.private(channelName)
                .listen('.MessageSent', handler)
                .error(() => setAuthError(`Gagal otorisasi private channel (${channelName})`));

            subscribedChannelsRef.current.add(channelName);
        } catch {}
    };

    const safeUnsubscribe = (channelName: string) => {
        if (!window.Echo) return;
        try { window.Echo.leave(channelName); subscribedChannelsRef.current.delete(channelName); } catch {}
    };

    useEffect(() => {
        if (!currentUserId || !adminId) return;

        safeSubscribe(`chat.${currentUserId}`, (event: { message: MessageData }) => {
            const uiMsg = formatMessageForUI(event.message, currentUserId);
            setMessages(prev => prev.some(m => m.id === uiMsg.id) ? prev : [...prev, uiMsg]);
        });

        safeSubscribe(`chat.${adminId}`, (event: { message: MessageData }) => {
            const msg = event.message;
            if (msg.receiver_id === adminId && msg.sender_id !== adminId) {
                const uiMsg = formatMessageForUI(msg, adminId);
                setMessages(prev => prev.some(m => m.id === uiMsg.id) ? prev : [...prev, uiMsg]);
            }
        });

        return () => {
            safeUnsubscribe(`chat.${currentUserId}`);
            safeUnsubscribe(`chat.${adminId}`);
        };
    }, [currentUserId, adminId]);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            setIsLoading(true);
            try {
                const user = await fetchCurrentUserProfile();
                setCurrentUser(user);
                const admin = await fetchAdminUserForChat();
                setAdminId(admin.id);

                if (user && admin) {
                    const msgs = await fetchMessages(admin);
                    const uiMsgs = msgs.map(msg => formatMessageForUI(msg, user.id));
                    setMessages(uiMsgs);
                }
            } finally { setIsLoading(false); }
        };
        loadData();
        return () => { isMounted = false; };
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !currentUserId || !adminId) return;
        const text = input.trim();
        const tempId = `temp-${Date.now()}`;
        const tempMsg: UIMessage = { id: tempId, text, from: 'user', isTemp: true };
        setMessages(prev => [...prev, tempMsg]);
        setInput(''); scrollToBottom();

        try {
            const sent = await sendMessage(adminId, text);
            const uiMsg = formatMessageForUI(sent, currentUserId);
            setMessages(prev => prev.some(m => m.id === uiMsg.id && !m.isTemp) ? prev.filter(m => m.id !== tempId) : prev.map(m => m.id === tempId ? uiMsg : m));
        } catch {
            setMessages(prev => prev.filter(m => m.id !== tempId));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    if (isLoading) return <div className="p-5 text-center">Memuat chat...</div>;
    if (!currentUser) return <div className="p-5 text-danger">Silakan login</div>;
    if (!adminId) return <div className="p-5 text-warning">Admin tidak ditemukan</div>;

    return (
        <div className="chat-box">
            <div className="chat-inner">
                <div className="chat-messages">
                    {messages.slice().sort((a,b)=>a.id.localeCompare(b.id)).map(msg => (
                        <div key={msg.id} className={`message-row ${msg.from === 'user' ? 'from-user' : 'from-bot'}`}>
                            <div className={`message-bubble ${msg.from} ${msg.isTemp?'opacity-50':''}`}>{msg.text}</div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Ketik pesan..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} />
                    <button onClick={handleSend} disabled={!input.trim()}><FaPaperPlane /></button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;