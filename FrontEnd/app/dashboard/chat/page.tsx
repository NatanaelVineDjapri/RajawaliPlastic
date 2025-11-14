'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Send, ChevronLeft } from 'lucide-react';
import ContactItem from '@/app/components/admincomponents/ContactItem';
import BubbleText from '@/app/components/admincomponents/BubbleText';

const HEADER_HEIGHT = 70;
const INPUT_HEIGHT = 70;

const adminUser = {
  username: "Admin Rajawali",
  avatar: "/images/avatarplaceholder.png",
};

const initialContacts = [
  {
    id: 1,
    username: "User A (Active)",
    lastMessage: "Halo, apakah barang saya sudah diproses",
    isOnline: true,
    hasUnread: true,
    hasPurpleNotif: true,
    avatar: "/images/avatar1.png",
    messages: [
      { id: 1, text: "Halo, apakah barang saya sudah diproses", isSender: false, time: "09:00 AM" },
      { id: 2, text: "Ya, kami sedang memproses pesanan Anda.", isSender: true, time: "09:05 AM" }
    ]
  },
  {
    id: 2,
    username: "User B",
    lastMessage: "Hai, Saya mau tanya produk B",
    isOnline: false,
    hasUnread: false,
    avatar: "/images/avatar2.png",
    messages: [
      { id: 1, text: "Hai, saya mau tanya produk B", isSender: false, time: "10:00 AM" }
    ]
  },
  {
    id: 3,
    username: "User C",
    lastMessage: "Tolong kirim sekarang.",
    isOnline: true,
    hasUnread: true,
    avatar: "/images/avatar3.png",
    messages: [
      { id: 1, text: "Tolong kirim sekarang ya.", isSender: false, time: "08:50 AM" }
    ]
  }
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export default function ChatPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [showChatWindow, setShowChatWindow] = useState(false);

  const isMobile = useIsMobile();
  const activeContact = contacts.find(c => c.id === activeContactId);

  useEffect(() => {
    if (!isMobile && activeContactId === null) setActiveContactId(initialContacts[0].id);
    if (!isMobile) setShowChatWindow(false);
  }, [isMobile, activeContactId]);

  const handleSend = () => {
    if (!inputText.trim() || !activeContact) return;

    const newMessage = {
      id: activeContact.messages.length + 1,
      text: inputText,
      isSender: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setContacts(prev =>
      prev.map(c =>
        c.id === activeContactId
          ? { ...c, messages: [...c.messages, newMessage], lastMessage: inputText }
          : c
      )
    );

    setInputText('');

    setTimeout(() => {
      const reply = {
        id: activeContact.messages.length + 2,
        text: "Baik, terima kasih",
        isSender: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setContacts(prev =>
        prev.map(c =>
          c.id === activeContactId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, hasUnread: true }
            : c
        )
      );
    }, 1500);
  };

  const handleSelectContact = (id: number) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, hasUnread: false, hasPurpleNotif: false } : c
      )
    );
    setActiveContactId(id);
    if (isMobile) setShowChatWindow(true);
  };

  const handleBackToContacts = () => setShowChatWindow(false);

  return (
    <div className="d-flex justify-content-center align-items-start w-100"
         style={{ height: "100vh", overflow: "hidden", background: "#ffffff4b" }}>

      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden !important;
          background: #ffffff !important;
        }
        .notif-purple {
          width: 8px;
          height: 8px;
          background-color: #a855f7;
          border-radius: 50%;
          position: absolute;
          right: 8px;
          top: 8px;
        }
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
            <div className="d-flex align-items-center gap-2 p-3 border-bottom flex-shrink-0"
                 style={{ height: HEADER_HEIGHT, backgroundColor: "#f0f4f8" }}>
              <Image src={adminUser.avatar} alt="Admin Avatar" width={40} height={40}
                     className="rounded-circle object-fit-cover" />
              <span className="fs-6 fw-semibold">{adminUser.username}</span>
            </div>

            <div className="overflow-y-auto flex-grow-1">
              {contacts.map(contact => (
                <div key={contact.id} className="position-relative">
                  {contact.hasPurpleNotif && <div className="notif-purple"></div>}

                  <ContactItem
                    username={contact.username}
                    lastMessage={contact.lastMessage}
                    isOnline={contact.isOnline}
                    isSelected={contact.id === activeContactId}
                    hasUnread={contact.hasUnread}
                    onClick={() => handleSelectContact(contact.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className={`d-flex flex-column flex-grow-1 position-relative
            ${isMobile ? (showChatWindow ? 'w-100' : 'd-none') : ''}`}
          >
            {activeContact ? (
              <>
                <div className="d-flex align-items-center p-3 border-bottom bg-light flex-shrink-0"
                     style={{ height: HEADER_HEIGHT }}>
                  {isMobile && (
                    <button className="btn btn-link p-0 me-2" onClick={handleBackToContacts}>
                      <ChevronLeft size={24} />
                    </button>
                  )}

                  <Image src="/images/avatarplaceholder.png" width={40} height={40}
                         className="rounded-circle object-fit-cover me-2" alt="avatar" />
                  <span className="fs-6 fw-semibold">{activeContact.username}</span>
                </div>

                <div className="overflow-y-auto p-3 flex-grow-1 d-flex flex-column justify-content-end">
                  {activeContact.messages.map(msg => (
                    <BubbleText
                      key={msg.id}
                      message={msg.text}
                      isSender={msg.isSender}
                      time={msg.time}
                    />
                  ))}
                </div>

                <div className="px-3 pb-200 pt-2 border-top bg-white flex-shrink-0"
                     style={{ height: INPUT_HEIGHT }}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="Tulis pesan..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button className="btn btn-primary rounded-circle ms-2"
                            style={{ width: "50px", height: "50px" }}
                            onClick={handleSend}>
                      <Send size={22} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center flex-grow-1 text-muted">
                <p>Pilih kontak untuk mulai chat</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}