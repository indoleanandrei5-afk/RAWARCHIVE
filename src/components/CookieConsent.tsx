"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function rejectCookies() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        margin: "0 auto",
        maxWidth: "720px",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "16px",
        background: "#111",
        color: "#fff",
        padding: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: "18px" }}>
        Cookie preferences
      </h2>

      <p style={{ margin: "0 0 16px", lineHeight: 1.5, color: "#d1d1d1" }}>
        We use optional analytics cookies to understand how visitors use our
        website.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={rejectCookies}
          style={{
            cursor: "pointer",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "10px",
            background: "transparent",
            color: "#fff",
            padding: "10px 16px",
          }}
        >
          Reject
        </button>

        <button
          type="button"
          onClick={acceptCookies}
          style={{
            cursor: "pointer",
            border: "none",
            borderRadius: "10px",
            background: "#fff",
            color: "#000",
            padding: "10px 16px",
            fontWeight: 600,
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

