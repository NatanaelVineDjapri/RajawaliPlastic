'use client';
import React from 'react';
import SendEmail from './components/sendEmail'; // ✅ arahkan ke file yang benar

const Page: React.FC = () => {
  return (
    <main>
      <h1>Welcome to My Website</h1>
      <SendEmail /> {/* ✅ panggil komponennya di sini */}
    </main>
  );
};

export default Page;
