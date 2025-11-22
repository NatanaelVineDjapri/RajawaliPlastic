"use client";

import React, { useState, useEffect } from "react";
import ChatContactList, {
  ChatContact,
} from "@/app/components/admincomponents/ChatContactList";
import ChatWindow from "@/app/components/admincomponents/ChatWindow";
import { fetchCurrentUserProfile, UserData } from "@/services/UserService";
import ChatPageSkeleton from "@/app/components/admincomponents/skeletons/ChatPageSkeleton";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
  const activeContact = contacts.find((c) => c.userId === activeUserId);
  const handleBackToContacts = () => setShowChatWindow(false);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const adminData = await fetchCurrentUserProfile();
        if (adminData.role !== "admin") return;
        setCurrentAdmin(adminData);
        // setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
      } catch {
      } finally {
        setIsDataLoading(false);
      }
    };
    loadAdminData();
  }, []);

  if (isDataLoading) {
    return (
      <div
        className="container-fluid p-3"
        style={{ height: "80vh", backgroundColor: "#f5f6fa" }}
      >
        <div className="row h-100 shadow rounded overflow-hidden bg-white">
          <ChatPageSkeleton contactsCount={5} messagesCount={6} />
        </div>
      </div>
    );
  }

  if (!currentAdmin) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-danger">
        Akses ditolak. Anda harus login sebagai Admin.
      </div>
    );
  }

  const verifiedAdminId = currentAdmin.id;
  const verifiedAdminUsername = currentAdmin.name;

  return (
    <div
      className="container-fluid p-3"
      style={{ height: "80vh", backgroundColor: "#f5f6fa" }}
    >
      <div className="row h-100 shadow rounded overflow-hidden bg-white">
        {/* Contacts List */}
        <div
          className={`col-12 col-lg-3 border-end p-0 d-flex flex-column
                        ${
                          isMobile
                            ? showChatWindow
                              ? "d-none"
                              : "d-flex"
                            : "d-flex"
                        }
                    `}
          style={{ maxHeight: "100%", overflowY: "auto" }}
        >
          <ChatContactList
            contacts={contacts}
            setContacts={setContacts}
            activeUserId={activeUserId}
            setActiveUserId={setActiveUserId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            ADMIN_ID={verifiedAdminId}
            // ADMIN_USERNAME={verifiedAdminUsername}
            isMobile={isMobile}
            setShowChatWindow={setShowChatWindow}
          />
        </div>

        {/* Chat Window */}
        <div
          className={`col-12 col-lg-9 p-0 position-relative
                        ${
                          isMobile
                            ? showChatWindow
                              ? "d-flex flex-column"
                              : "d-none"
                            : "d-flex flex-column"
                        }
                    `}
          style={{ maxHeight: "100%" }}
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
  );
}
