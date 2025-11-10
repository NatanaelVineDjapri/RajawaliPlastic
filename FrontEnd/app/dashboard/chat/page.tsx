'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Send, ChevronLeft } from 'lucide-react'; 
import ContactItem from '@/app/components/admincomponents/ContactItem';
import BubbleText from '@/app/components/admincomponents/BubbleText';

const BACKGROUND_SRC = "/images/lighbluecloud.jpg";
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
      { id: 2, text: "Ya, kami sedang memproses pesanan Anda.", isSender: true, time: "09:05 AM" },
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
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, hasUnread: true }
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
    if (isMobile) setShowChatWindow(true);
  };

  const handleBackToContacts = () => setShowChatWindow(false);

  return (
    <div className="d-flex justify-content-center align-items-start w-100 p-1 p-md-3" style={{ overflow: "hidden" }}>
      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden !important;
          background: #e0f7fa !important;
        }
        ::-webkit-scrollbar {
          width: 4px;
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
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
        @media (min-width: 992px) {
          .contact-panel-desktop {
            width: 300px !important; 
            min-width: 280px !important;
          }
        }
        @media (max-width: 991px) {
          .debug-back-btn {
            z-index: 1000 !important;
            pointer-events: all !important;
          }
        }
      `}</style>

      <div
        className="border border-2 rounded-4 shadow-sm d-flex flex-column"
        style={{
          width: "100%", 
          maxWidth: "1600px",
          height: "90vh", 
          marginTop: "10px",
          overflow: "hidden",
          backgroundColor: "#ffffffb0",
          borderColor: "#cfd8dc",
        }}
      >
        <div className="d-flex flex-grow-1">
          
          <div 
            className={`border-end bg-white d-flex flex-column position-relative flex-shrink-0 d-lg-flex contact-panel-desktop 
                        ${isMobile ? (showChatWindow ? 'd-none' : 'w-100') : ''}`}
            style={!isMobile ? { borderRight: '1px solid #dee2e6' } : {}}
          >
            <div className="d-flex align-items-center gap-2 p-2 p-md-3 border-bottom flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px`, backgroundColor: "#e0f7fa" }}>
              <Image src={adminUser.avatar} alt="Admin Avatar" width={32} height={32} className="rounded-circle object-fit-cover" style={{ border: "2px solid #a8cfff" }} />
              <span className="fs-7 fw-semibold text-dark d-none d-sm-inline">{adminUser.username}</span> 
              <span className="fs-7 fw-semibold text-dark d-sm-none" style={{fontSize: '0.75rem'}}>{adminUser.username}</span> 
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

          <div 
            className={`d-flex flex-column flex-grow-1 position-relative d-lg-flex w-100 
                        ${isMobile ? (showChatWindow ? 'w-100' : 'd-none') : ''}`}
          >
            {activeContact || !isMobile ? ( 
              <>
                <div className="d-flex align-items-center p-2 p-md-3 border-bottom bg-info-subtle flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px` }}>
                  <button 
                    className="btn btn-link p-0 d-lg-none me-2 flex-shrink-0 debug-back-btn" 
                    onClick={handleBackToContacts}
                    style={{ color: '#333' }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  {activeContact && 
                    <Image src="/images/avatarplaceholder.png" alt="Active User Avatar" width={32} height={32} className="rounded-circle object-fit-cover me-2" /> 
                  }
                  
                  <div className="d-flex flex-column flex-grow-1">
                      <span className="fs-6 fw-semibold text-dark d-none d-sm-inline">{activeContact ? activeContact.username : 'Pilih Kontak'}</span>
                      <span className="fs-7 fw-semibold text-dark d-sm-none" style={{fontSize: '0.8rem'}}>{activeContact ? activeContact.username : 'Pilih Kontak'}</span>
                  </div>
                </div>

                {activeContact ? (
                  <>
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                      backgroundImage: `url(${BACKGROUND_SRC})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.15,
                      zIndex: 0,
                    }}></div>

                    <div className="overflow-y-auto p-2 p-md-4 flex-grow-1 d-flex flex-column justify-content-end" style={{ zIndex: 1 }}>
                      {activeContact.messages.map(msg => (
                        <BubbleText key={msg.id} message={msg.text} isSender={msg.isSender} time={msg.time} />
                      ))}
                    </div>

                    <div className="p-2 border-top bg-white flex-shrink-0" style={{ height: `${INPUT_HEIGHT}px`, zIndex: 1 }}>
                      <div className="input-group align-items-center">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className="form-control rounded-3 fs-7"
                          placeholder="Tulis pesan..."
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          style={{height: '45px'}}
                        />
                        <button className="btn btn-primary rounded-circle ms-2 flex-shrink-0" type="button" style={{ width: "45px", height: "45px" }} onClick={handleSend}>
                          <Send size={20} className="mx-auto" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                      <p className="small">Pilih kontak untuk memulai percakapan</p>
                  </div>
                )}
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                  <p className="small">Harap Pilih Kontak</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}