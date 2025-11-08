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
  avatar: "/images/avatarplaceholder.png"
};

const dummyContacts = [
  { id: 1, username: "User A (Active)", lastMessage: "Halo, barangnya ready?", isOnline: true, isActive: true, avatar: "/images/avatar1.png" },
  { id: 2, username: "User B", lastMessage: "Lorem ipsum dolor sit amet...", isOnline: false, isActive: false, avatar: "/images/avatar2.png" },
  { id: 3, username: "User C", lastMessage: "Tolong kirim sekarang.", isOnline: true, isActive: true, avatar: "/images/avatar3.png" },
];

export default function ChatPage() {
  const [activeContactId, setActiveContactId] = useState(dummyContacts[0].id);
  const activeContact = dummyContacts.find(c => c.id === activeContactId) || dummyContacts[0];

  return (
    <div className="p-4 w-100 mx-auto"> 
      <h1 className="fs-3 fw-bold text-dark mb-4">Chat</h1>
      
      <div 
        className="d-flex w-100 mx-auto border rounded-lg" 
        style={{ 
          maxHeight: '800px',
          minHeight: '600px',
          overflow: 'hidden', 
          backgroundColor: '#e0f7fa',
          backgroundImage: `url(${BACKGROUND_SRC})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 8px;
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
        `}</style>
        
        <div className="d-flex flex-grow-1 bg-white bg-opacity-75" style={{ backdropFilter: 'blur(1px)' }}>
          <div className="border-end bg-white d-flex flex-column" style={{ width: '300px', minWidth: '250px' }}>
            <div 
              className="d-flex align-items-center gap-3 p-3 border-bottom flex-shrink-0" 
              style={{ 
                height: `${HEADER_HEIGHT}px`,
                backgroundColor: '#e0f7fa',
                padding: '1rem',
                borderBottom: '1px solid #b3e0ff'
              }}
            >
              <Image
                src={adminUser.avatar} 
                alt="Admin Avatar"
                width={50}
                height={50}
                className="rounded-circle object-fit-cover"
                style={{ border: '2px solid #a8cfff' }}
              />
              <span className="fs-5 fw-semibold text-dark">{adminUser.username}</span>
            </div>
            
            <div className="overflow-y-auto bg-white flex-grow-1">
              {dummyContacts.map(contact => (
                <ContactItem 
                  key={contact.id} 
                  {...contact} 
                  isSelected={contact.id === activeContactId}
                  onClick={() => setActiveContactId(contact.id)}
                />
              ))}
            </div>
          </div>

          <div className="d-flex flex-column flex-grow-1 h-100"> 
            <div className="d-flex align-items-center gap-3 p-3 border-bottom bg-info-subtle flex-shrink-0" style={{ height: `${HEADER_HEIGHT}px` }}>
              <Image
                src={"/images/avatarplaceholder.png"}
                alt="Active User Avatar"
                width={40}
                height={40}
                className="rounded-circle object-fit-cover"
              />
              <span className="fs-5 fw-semibold text-dark">{activeContact.username}</span>
            </div>
            
            <div className="overflow-y-auto p-4 d-flex flex-column justify-content-end flex-grow-1">
              <BubbleText message={`Ini adalah chat dengan ${activeContact.username}.`} isSender={false} time="09:00 AM" />
              <BubbleText message="Barang ready, silakan order!" isSender={true} time="09:01 AM" />
            </div>
            
            <div className="p-3 border-top bg-white flex-shrink-0" style={{ height: `${INPUT_HEIGHT}px` }}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control form-control-lg rounded-3" 
                  placeholder="Enter your message here..." 
                />
                <button className="btn btn-primary rounded-circle ms-2" type="button" style={{ width: '50px', height: '50px' }}>
                  <Send size={24} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}