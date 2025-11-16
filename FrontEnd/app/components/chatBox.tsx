'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { 
    fetchMessages, 
    sendMessage, 
    MessageData,
    UserData 
} from '@/services/messageService'; 
import { 
    fetchCurrentUserProfile, 
    fetchAdminUserForChat
} from '@/services/UserService'; 
import { listenToChannel } from '@/utils/echo'; 

interface UIMessage {
    id: string;
    text: string;
    from: 'user' | 'bot'; 
    isTemp?: boolean; 
}

const formatMessageForUI = (msg: MessageData, currentUserId: string): UIMessage => ({
    id: msg._id,
    text: msg.message,
    from: msg.sender_id === currentUserId ? 'user' : 'bot',
});


const fetchDynamicAdminId = async (): Promise<string | null> => {
    try {
        const adminUser = await fetchAdminUserForChat(); 
        
        console.log(`[ChatBox] Admin ID ditemukan via Endpoint Khusus: ${adminUser.id} (${adminUser.name})`);
        return adminUser.id;
        
    } catch (error) {
        console.error("Gagal mendapatkan ID Admin dari endpoint khusus:", error);
        return null;
    }
};


const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<UIMessage[]>([]); 
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserData | null>(null); 
    const [adminId, setAdminId] = useState<string | null>(null); 
    const chatEndRef = useRef<HTMLDivElement>(null);

    const currentUserId = currentUser?.id; 

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        const setupListener = (userId: string) => {
            if (typeof window !== 'undefined' && window.Echo) {
                console.log(`[ChatBox] Listening to channel: chat.${userId}`);
                
                listenToChannel(userId, (event: { message: MessageData }) => {
                    const newMessage = formatMessageForUI(event.message, userId);

                    setMessages(prev => {
                        const tempText = event.message.message; 
                        return [
                            ...prev.filter(msg => msg.text !== tempText || !msg.isTemp),
                            newMessage
                        ].sort((a, b) => a.id.localeCompare(b.id));
                    });
                });
            }
        };

        const loadData = async () => {
            setIsLoading(true);
            let user: UserData | null = null;
            let targetAdminId: string | null = null;

            try {
                user = await fetchCurrentUserProfile();
                setCurrentUser(user);
            } catch (error) {
                console.error("Gagal memuat profil user (Pastikan Anda Login):", error);
                setIsLoading(false);
                return;
            }

            targetAdminId = await fetchDynamicAdminId();
            setAdminId(targetAdminId);
            
            if (!targetAdminId) {
                console.error("Tidak dapat memulai chat karena ID Admin tidak ditemukan.");
                setIsLoading(false);
                return;
            }

            try {
                const apiMessages = await fetchMessages(targetAdminId);
                const uiMessages = apiMessages.map(msg => formatMessageForUI(msg, user!.id));
                setMessages(uiMessages);
            } catch (error) {
                console.error("Gagal memuat riwayat pesan:", error);
            } finally {
                setIsLoading(false);
            }

            setupListener(user.id);
        };
        
        loadData();
        
        return () => {
            if (currentUser?.id && window.Echo) {
                window.Echo.leave(`chat.${currentUser.id}`);
            }
        };
    }, []); 


    const handleSend = async () => {
        if (input.trim() === '' || !currentUserId || !adminId) return; 

        const textToSend = input.trim();
        const tempId = `temp-${Date.now()}`; 

        const tempMessage: UIMessage = {
            id: tempId,
            text: textToSend,
            from: 'user',
            isTemp: true
        };
        setMessages((prev) => [...prev, tempMessage]);
        setInput('');

        try {
            await sendMessage(adminId, textToSend); 
        } catch (error) {
            console.error("Gagal mengirim pesan:", error);
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    if (isLoading) {
        return <div className="text-center p-5">Memuat sesi chat dan mencari Admin...</div>;
    }
    
    if (!currentUser) {
        return <div className="text-center p-5 text-danger">Akses ditolak. Silakan login terlebih dahulu.</div>;
    }
    
    if (!adminId) {
        return <div className="text-center p-5 text-warning">Chat tidak tersedia. Admin support tidak ditemukan. (Pastikan Admin ada di database)</div>;
    }


    return (
        <div className="chat-box">
            <div className="text-center text-muted small p-2 border-bottom">
                Chatting dengan Admin ID: {adminId}
            </div>
            <div className="chat-inner">
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-row ${
                                msg.from === 'user' ? 'from-user' : 'from-bot'
                            }`}
                        >
                            <div className={`message-bubble ${msg.from} ${msg.isTemp ? 'opacity-50' : ''}`}>{msg.text}</div>
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
                        disabled={!currentUserId || isLoading || !adminId} 
                    />
                    <button onClick={handleSend} disabled={!currentUserId || isLoading || !adminId}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;