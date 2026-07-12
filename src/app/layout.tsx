import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAW ARCHIVE PHOTOS",
  description: "Professional photo editing for photographers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--font-body": '"Avenir Next", "Segoe UI", sans-serif',
            "--font-display": '"Times New Roman", serif',
          } as React.CSSProperties
        }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
