'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBox from '../components/chatBox';

const ChatPage: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="chat-page d-flex flex-column align-items-center justify-content-center">
      <ChatBox />
    </div>
  );
};

export default ChatPage;
