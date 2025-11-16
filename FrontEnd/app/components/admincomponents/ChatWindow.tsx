'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPaperPlane, FaArrowLeft, FaSpinner, FaUserCircle } from 'react-icons/fa';
import { fetchMessages, sendMessage, MessageData } from '@/services/messageService';
import { listenToChannel } from '@/utils/echo';
import { ChatContact } from './ChatContactList'; 

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
    from: 'admin' | 'customer';
    isTemp?: boolean;
}

const formatMessageForUI = (msg: MessageData, currentAdminId: string): UIMessage => ({
    id: msg._id,
    text: msg.message,
    from: msg.sender_id === currentAdminId ? 'admin' : 'customer',
});

const ChatWindow: React.FC<ChatWindowProps> = ({ 
    activeContact, 
    ADMIN_ID, 
    isMobile, 
    handleBackToContacts,
    setContacts
}) => {
    const [messages, setMessages] = useState<UIMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const loadMessages = useCallback(async (receiverId: string) => {
        if (!receiverId) return;

        setIsLoadingMessages(true);
        try {
            const apiMessages = await fetchMessages(receiverId);
            const uiMessages = apiMessages.map(msg => formatMessageForUI(msg, ADMIN_ID));
            setMessages(uiMessages);
        } finally {
            setIsLoadingMessages(false);
        }
    }, [ADMIN_ID]);
    
    useEffect(() => {
        if (activeContact?.userId) {
            loadMessages(activeContact.userId);

            if (window.Echo) {
                window.Echo.leave(`chat.${activeContact.userId}`);
            }
        }
    }, [activeContact?.userId, loadMessages]);
    
    useEffect(() => {
        const userIdToListen = activeContact?.userId;
        
        if (userIdToListen && typeof window !== 'undefined' && window.Echo) {
            listenToChannel(ADMIN_ID, (event: { message: MessageData }) => {
                const newMessage = event.message;

                if (newMessage.sender_id === ADMIN_ID && newMessage.receiver_id === userIdToListen) {
                    setMessages(prev => {
                        const tempText = newMessage.message;
                        const isTempMessage = prev.find(msg => msg.text === tempText && msg.isTemp);
                        
                        if (isTempMessage) {
                           return prev
                            .filter(msg => msg.id !== isTempMessage.id)
                            .concat(formatMessageForUI(newMessage, ADMIN_ID));
                        }
                        return prev.concat(formatMessageForUI(newMessage, ADMIN_ID));
                    });

                    setContacts(prev => prev.map(c => 
                        c.userId === userIdToListen ? {...c, lastMessageText: newMessage.message} : c
                    ));
                }
            });
            
            listenToChannel(userIdToListen, (event: { message: MessageData }) => {
                const newMessage = event.message;

                if (newMessage.sender_id === userIdToListen && newMessage.receiver_id === ADMIN_ID) {
                    setMessages(prev => prev.concat(formatMessageForUI(newMessage, ADMIN_ID)));

                    setContacts(prev => prev.map(c => 
                        c.userId === userIdToListen 
                            ? {...c, lastMessageText: newMessage.message, unreadCount: 0} 
                            : c
                    ));
                }
            });
            
            return () => {
                if (window.Echo) {
                    window.Echo.leave(`chat.${userIdToListen}`);
                    window.Echo.leave(`chat.${ADMIN_ID}`);
                }
            };
        }
        return undefined;
    }, [activeContact?.userId, ADMIN_ID, setContacts]);

    const handleSend = async () => {
        const receiverId = activeContact?.userId;
        if (input.trim() === '' || !receiverId) return;

        const textToSend = input.trim();
        const tempId = `temp-${Date.now()}`;

        const tempMessage: UIMessage = {
            id: tempId,
            text: textToSend,
            from: 'admin',
            isTemp: true
        };
        setMessages(prev => [...prev, tempMessage]);
        setInput('');

        try {
            await sendMessage(receiverId, textToSend);
        } catch {
            setMessages(prev => prev.filter(msg => msg.id !== tempId));
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
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
                        className="me-3 cursor-pointer" 
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <FaUserCircle size={30} className="text-gray-400 me-2" />
                <h5 className="mb-0 fw-bold">{activeContact.name}</h5>
            </div>

            <div className="chat-messages-container flex-grow-1 overflow-y-auto p-3" style={{ background: '#f5f7fa' }}>
                {isLoadingMessages ? (
                    <div className="text-center text-muted mt-5">
                        <FaSpinner className="spin me-2" /> Memuat riwayat...
                    </div>
                ) : messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.from === 'admin' ? 'justify-content-end sender-bubble' : 'justify-content-start'}`}
                    >
                        <div
                            className={`p-2 rounded shadow-sm chat-bubble ${
                                msg.from === 'admin' ? 'bg-primary text-white' : 'bg-white text-dark'
                            }`}
                            style={{ opacity: msg.isTemp ? 0.6 : 1, maxWidth: '75%' }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
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
                    disabled={isLoadingMessages}
                />
                <button 
                    className="btn btn-primary" 
                    onClick={handleSend} 
                    disabled={input.trim() === '' || isLoadingMessages}
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;