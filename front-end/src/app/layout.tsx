import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI assistant",
  description: "ChatBot is your AI assistant",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
