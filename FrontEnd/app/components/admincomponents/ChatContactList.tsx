'use client';
import React, { useEffect, useCallback } from 'react';
import { fetchConversations, MessageData, ConversationData, UserData } from '@/services/messageService';
import { listenToChannel } from '@/utils/echo';
import { FaSpinner } from 'react-icons/fa';
import ContactItem from './ContactItem';

export interface ChatContact {
    userId: string;
    name: string;
    lastMessageText: string;
    lastMessageTime: string;
    unreadCount: number;
    profileImage: string;
}

interface ChatContactListProps {
    contacts: ChatContact[];
    setContacts: React.Dispatch<React.SetStateAction<ChatContact[]>>;
    activeUserId: string | null;
    setActiveUserId: React.Dispatch<React.SetStateAction<string | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    ADMIN_ID: string;
    ADMIN_USERNAME: string;
    isMobile: boolean;
    setShowChatWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const mapConversationToContact = (conv: ConversationData, currentAdminId: string): ChatContact | null => {
    const potentialCustomer = conv.sender?.id === currentAdminId ? conv.receiver : conv.sender;
    if (!potentialCustomer || !potentialCustomer.id) return null;

    const customer: UserData = potentialCustomer;
    const isUnreadForAdmin = !conv.is_read && conv.receiver_id === currentAdminId;

    return {
        userId: customer.id,
        name: customer.name,
        lastMessageText: conv.message.substring(0, 40) + (conv.message.length > 40 ? '...' : ''),
        lastMessageTime: conv.created_at,
        unreadCount: isUnreadForAdmin ? 1 : 0,
        profileImage: customer.image || '',
    };
};

const ChatContactList: React.FC<ChatContactListProps> = ({
    contacts,
    setContacts,
    activeUserId,
    setActiveUserId,
    isLoading,
    setIsLoading,
    ADMIN_ID,
    isMobile,
    setShowChatWindow
}) => {
    const fetchChatContacts = useCallback(async () => {
        setIsLoading(true);
        try {
            const conversations = await fetchConversations();
            const newContacts: ChatContact[] = conversations
                .map(conv => mapConversationToContact(conv, ADMIN_ID))
                .filter((contact): contact is ChatContact => contact !== null)
                .reduce((acc: ChatContact[], curr: ChatContact) => {
                    const existing = acc.findIndex(c => c.userId === curr.userId);
                    if (existing !== -1) {
                        acc[existing] = {
                            ...acc[existing],
                            lastMessageText: curr.lastMessageText,
                            lastMessageTime: curr.lastMessageTime,
                            unreadCount: acc[existing].unreadCount + curr.unreadCount,
                        };
                    } else {
                        acc.push(curr);
                    }
                    return acc;
                }, [])
                .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());

            setContacts(newContacts);

            if (newContacts.length > 0 && !activeUserId) {
                setActiveUserId(newContacts[0].userId);
            }
        } catch (error) {
            console.error("Gagal memuat daftar kontak chat:", error);
        } finally {
            setIsLoading(false);
        }
    }, [ADMIN_ID, setActiveUserId, setContacts, setIsLoading, activeUserId]);

    useEffect(() => {
        fetchChatContacts();
    }, [fetchChatContacts]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Echo) {
            listenToChannel(ADMIN_ID, (event: { message: MessageData, sender: UserData }) => {
                const newMessage = event.message;
                const sender = event.sender;
                
                if (newMessage.sender_id !== ADMIN_ID) {
                    setContacts(prevContacts => {
                        const existingContactIndex = prevContacts.findIndex(c => c.userId === sender.id);
                        
                        const newContactData: ChatContact = {
                            userId: sender.id,
                            name: sender.name,
                            lastMessageText: newMessage.message.substring(0, 40) + '...',
                            lastMessageTime: newMessage.created_at,
                            unreadCount: (sender.id === activeUserId) ? 0 : (existingContactIndex !== -1 ? prevContacts[existingContactIndex].unreadCount + 1 : 1),
                            profileImage: sender.image || '',
                        };

                        let updatedContacts;
                        if (existingContactIndex !== -1) {
                            updatedContacts = [...prevContacts];
                            updatedContacts.splice(existingContactIndex, 1);
                            updatedContacts.unshift(newContactData);
                        } else {
                            updatedContacts = [newContactData, ...prevContacts];
                        }

                        return updatedContacts;
                    });
                }
            });
        }
        
        return () => {
            if (window.Echo) {
                window.Echo.leave(`chat.${ADMIN_ID}`);
            }
        };
    }, [ADMIN_ID, setContacts, activeUserId]);

    const handleContactClick = (userId: string) => {
        setActiveUserId(userId);
        setContacts(prev => prev.map(c => c.userId === userId ? { ...c, unreadCount: 0 } : c));
        if (isMobile) setShowChatWindow(true);
    };

    const renderContacts = () => {
        if (isLoading) {
            return (
                <div className="p-4 text-center text-muted">
                    <FaSpinner className="spin me-2" /> Memuat kontak...
                </div>
            );
        }
        if (contacts.length === 0) {
            return <div className="p-4 text-center text-muted">Belum ada percakapan baru.</div>;
        }

        return contacts.map((contact) => (
            <ContactItem
                key={contact.userId}
                username={contact.name}
                lastMessage={contact.lastMessageText}
                isOnline={false}
                isSelected={contact.userId === activeUserId}
                hasUnread={contact.unreadCount > 0}
                onClick={() => handleContactClick(contact.userId)}
                avatarUrl={contact.profileImage}
            />
        ));
    };

    return (
        <div className="w-100 overflow-y-auto">
            <h5 className="p-3 mb-0 border-bottom bg-light">Daftar Chat ({contacts.length})</h5>
            <div className="chat-contact-list-inner">
                {renderContacts()}
            </div>
        </div>
    );
};

export default ChatContactList;