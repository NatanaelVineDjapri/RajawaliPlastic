'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBox from '../components/chatBox';

const ChatPage: React.FC = () => {
  return (
    <div
      className="chat-page d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("/images/bg_Chat.jpg")', // ganti ke path image lo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '60px',
      }}
    >
      <ChatBox />
    </div>
  );
};

export default ChatPage;
