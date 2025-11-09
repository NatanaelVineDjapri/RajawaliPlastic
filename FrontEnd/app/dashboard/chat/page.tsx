'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import ContactItem from '@/app/components/admincomponents/ContactItem';
import BubbleText from '@/app/components/admincomponents/BubbleText';

const BACKGROUND_SRC = "/images/lighbluecloud.jpg";
const HEADER_HEIGHT = 80;
const INPUT_HEIGHT = 80;

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
      { id: 1, text: "Hai, saya mau tanya produk B", isSender: false, time: "10:00 AM" },
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
      { id: 1, text: "Tolong kirim sekarang ya.", isSender: false, time: "08:50 AM" },
    ]
  },
];

export default function ChatPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');

  const activeContact = contacts.find(c => c.id === activeContactId);

  const handleSend = () => {
    if (!inputText.trim() || !activeContact) return;
    const newMessage = {
      id: activeContact.messages.length + 1,
      text: inputText,
      isSender: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setContacts(prevContacts =>
      prevContacts.map(c =>
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
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setContacts(prevContacts =>
        prevContacts.map(c =>
          c.id === activeContactId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text }
            : c
        )
      );
    }, 1500);
  };

  const handleSelectContact = (id: number) => {
    setContacts(prevContacts =>
      prevContacts.map(c =>
        c.id === id ? { ...c, hasUnread: false, hasPurpleNotif: false } : c
      )
    );
    setActiveContactId(id);
  };

  return (
    <div className="d-flex justify-content-center align-items-start w-100" style={{ overflow: "hidden" }}>
      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden !important;
          background: #e0f7fa !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 1);
          border-radius: 4px;
        }
        .notif-purple {
          width: 10px;
          height: 10px;
          background-color: #a855f7;
          border-radius: 50%;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      `}</style>

      <div
        className="border border-2 rounded-4 shadow-sm d-flex flex-column"
        style={{
          width: "95%",
          maxWidth: "1600px",
          height: "75vh",
          marginTop: "20px",
          overflow: "hidden",
          backgroundColor: "#ffffffb0",
          borderColor: "#cfd8dc",
        }}
      >
        <div className="d-flex flex-grow-1">
          <div className="border-end bg-white d-flex flex-column position-relative" style={{ width: "260px", minWidth: "240px" }}>
            <div className="d-flex align-items-center gap-3 p-3 border-bottom flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px`, backgroundColor: "#e0f7fa" }}>
              <Image src={adminUser.avatar} alt="Admin Avatar" width={50} height={50} className="rounded-circle object-fit-cover" style={{ border: "2px solid #a8cfff" }} />
              <span className="fs-6 fw-semibold text-dark">{adminUser.username}</span>
            </div>

            <div className="overflow-y-auto flex-grow-1 position-relative">
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

          <div className="d-flex flex-column flex-grow-1 position-relative">
            {activeContact ? (
              <>
                <div className="d-flex align-items-center gap-3 p-3 border-bottom bg-info-subtle flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px` }}>
                  <Image src="/images/avatarplaceholder.png" alt="Active User Avatar" width={40} height={40} className="rounded-circle object-fit-cover" />
                  <span className="fs-6 fw-semibold text-dark">{activeContact.username}</span>
                </div>

                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  backgroundImage: `url(${BACKGROUND_SRC})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.15,
                  zIndex: 0,
                }}></div>

                <div className="overflow-y-auto p-4 flex-grow-1 d-flex flex-column justify-content-end" style={{ zIndex: 1 }}>
                  {activeContact.messages.map(msg => (
                    <BubbleText key={msg.id} message={msg.text} isSender={msg.isSender} time={msg.time} />
                  ))}
                </div>

                <div className="p-3 border-top bg-white flex-shrink-0" style={{ height: `${INPUT_HEIGHT}px`, zIndex: 1 }}>
                  <div className="input-group">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your message here..."
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button className="btn btn-primary rounded-circle ms-2" type="button" style={{ width: "50px", height: "50px" }} onClick={handleSend}>
                      <Send size={24} className="mx-auto" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                <p>Pilih kontak untuk memulai percakapan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}