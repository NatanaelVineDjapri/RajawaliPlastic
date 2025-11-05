'use client';
import React from 'react';
import '../globals.css';

const SendEmail: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-text">
          <h2>
            Send Us an <span>Email!</span>
          </h2>
          <p>
            Tolong tinggalkan masukan untuk kami, karena kami terus berupaya untuk menjadi lebih baik!
          </p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Enter Name..." />
            <input type="email" placeholder="Enter Email..." />
          </div>
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send Email</button>
        </form>
      </div>
    </section>
  );
};

export default SendEmail;
