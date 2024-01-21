import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI assistant",
  description: "ChatBot is your AI assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} className={inter.className}>
        {children}
      </body>
    </html>
  );
}
