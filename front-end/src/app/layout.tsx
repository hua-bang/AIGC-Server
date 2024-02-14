import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { Toaster } from "@/components/ui/toaster";

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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body style={{ margin: 0 }} className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
