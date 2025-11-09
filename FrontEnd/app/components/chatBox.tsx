'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: 'Hey there!', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages((prev) => [...prev, { text: input, from: 'user' }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'Terima kasih atas pesanmu!', from: 'bot' },
      ]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-box">
      <div className="chat-inner">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message-row ${
                msg.from === 'user' ? 'from-user' : 'from-bot'
              }`}
            >
              <div className={`message-bubble ${msg.from}`}>{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;