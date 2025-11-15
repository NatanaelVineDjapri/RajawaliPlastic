"use client";
import React, { FormEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import { sendForm } from "@emailjs/browser";
import { EMAILJS_CONFIG } from "./emailConfig";

export default function SendEmail(): JSX.Element {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const form = e.currentTarget;
      const result = await sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      console.log("EmailJS success:", result.text);

      setStatus("Pesan terkirim. Terima kasih!");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("Gagal mengirim. Coba lagi nanti.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="py-5 contact-section"
      style={{
        backgroundImage: "url('/images/bg_daun2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container text-light">
        <div className="row align-items-center g-5">
          <div className="col-md-5 text-md-start text-center">
            <h2 className="contact-title">
              Send Us an <span>Email!</span>
            </h2>
            <p className="mt-3 fs-6 fw-light">
              Tolong tinggalkan masukan untuk kami, karena kami terus berupaya
              untuk menjadi lebih baik!
            </p>
          </div>

          <div className="col-md-7">
            <form
              onSubmit={handleSubmit}
              className="bg-light bg-opacity-75 p-4 rounded-4 shadow-sm"
            >
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    name="user_name"
                    type="text"
                    className="form-control rounded-4 p-2"
                    placeholder="Enter Name..."
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="user_email"
                    type="email"
                    className="form-control rounded-4 p-2"
                    placeholder="Enter Email..."
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control rounded-4 p-2"
                  rows={5}
                  placeholder="Message"
                  required
                />
              </div>

              <button
                type="submit"
                className="custom-btn btn px-4 fw-semibold"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Email"}
              </button>

              {status && <p className="mt-3 text-dark">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}