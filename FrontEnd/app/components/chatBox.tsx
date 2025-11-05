'use client';
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: 'Hey there! 👋', from: 'bot' },
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
        { text: 'Terima kasih atas pesanmu! 😊', from: 'bot' },
      ]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div
      className="chat-box shadow-lg rounded-4 p-4"
      style={{
        backgroundColor: '#1E88E5', 
        maxWidth: '900px',
        width: '100%',
        height: '75vh', 
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="chat-inner rounded-4 p-4"
        style={{
          backgroundColor: '#BBDEFB', 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Chat Messages */}
        <div
          className="chat-messages mb-3"
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingRight: '5px',
          }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`d-flex mb-2 ${msg.from === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div
                className="px-3 py-2 rounded-3"
                style={{
                  backgroundColor: msg.from === 'user' ? '#1565C0' : 'white',
                  color: msg.from === 'user' ? 'white' : 'black',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  fontSize: '0.95rem',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control rounded-pill py-2 px-3"
            placeholder="Ketik pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              backgroundColor: 'white',
              border: 'none',
              flex: 1,
            }}
          />
          <button
            className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: '45px', height: '45px' }}
            onClick={sendMessage}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
