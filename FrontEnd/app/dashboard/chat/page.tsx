'use client';

import React, { useState, useEffect } from 'react';
import ChatContactList, { ChatContact } from '@/app/components/admincomponents/ChatContactList';
import ChatWindow from '@/app/components/admincomponents/ChatWindow';
import { fetchCurrentUserProfile, UserData } from '@/services/UserService';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 992);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};

export default function ChatPage() {
    const [currentAdmin, setCurrentAdmin] = useState<UserData | null>(null);
    const [contacts, setContacts] = useState<ChatContact[]>([]);
    const [activeUserId, setActiveUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const isMobile = useIsMobile();
    const activeContact = contacts.find(c => c.userId === activeUserId);
    const handleBackToContacts = () => setShowChatWindow(false);

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                const adminData = await fetchCurrentUserProfile();
                if (adminData.role !== 'admin') return;
                setCurrentAdmin(adminData);
                setIsLoading(true);
            } catch {
            } finally {
                setIsDataLoading(false);
            }
        };
        loadAdminData();
    }, []);

    if (isDataLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                Memverifikasi akses Admin...
            </div>
        );
    }

    if (!currentAdmin) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", color: "red" }}>
                Akses ditolak. Anda harus login sebagai Admin.
            </div>
        );
    }

    const verifiedAdminId = currentAdmin.id;
    const verifiedAdminUsername = currentAdmin.name;

    return (
        <div
            className="d-flex justify-content-center align-items-start w-100"
            style={{ height: "100vh", overflow: "hidden", background: "#ffffff4b" }}
        >
            <style jsx global>{`
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden !important;
                    background: #ffffff !important;
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    .spin {
                        animation: spin 1s linear infinite;
                    }
                }
                .notif-purple { width: 8px; height: 8px; background-color: #a855f7; border-radius: 50%; position: absolute; right: 8px; top: 8px; }
                .chat-bubble { max-width: 70%; }
                .sender-bubble { margin-left: auto; }
            `}</style>

            <div
                className="border rounded-4 shadow-lg d-flex flex-column"
                style={{
                    width: "80%",
                    maxWidth: "900px",
                    height: "75vh",
                    marginTop: "20px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    borderColor: "#dfe6eb"
                }}
            >
                <div className="d-flex flex-grow-1">
                    <div
                        className={`border-end bg-white d-flex flex-column flex-shrink-0 
                        ${isMobile ? (showChatWindow ? 'd-none' : 'w-100') : ''}`}
                        style={{ width: isMobile ? "100%" : "260px", minWidth: "240px" }}
                    >
                        <ChatContactList
                            contacts={contacts}
                            setContacts={setContacts}
                            activeUserId={activeUserId}
                            setActiveUserId={setActiveUserId}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            ADMIN_ID={verifiedAdminId}
                            ADMIN_USERNAME={verifiedAdminUsername}
                            isMobile={isMobile}
                            setShowChatWindow={setShowChatWindow}
                        />
                    </div>

                    <div
                        className={`d-flex flex-column flex-grow-1 position-relative
                        ${isMobile ? (showChatWindow ? 'w-100' : 'd-none') : ''}`}
                    >
                        <ChatWindow
                            activeContact={activeContact}
                            ADMIN_ID={verifiedAdminId}
                            isMobile={isMobile}
                            handleBackToContacts={handleBackToContacts}
                            setContacts={setContacts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}