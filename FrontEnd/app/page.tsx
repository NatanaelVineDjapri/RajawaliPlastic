'use client';
import React from 'react';
import SendEmail from './components/sendEmail';
import Footer from './components/footer';
const Page: React.FC = () => {
  return (
    <main>
      <SendEmail />
      <Footer />
    </main>
  );
};

export default Page;
