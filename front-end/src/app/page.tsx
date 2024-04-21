"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Bot from "@/app/asserts/images/bot.png";
import AuthWrapper from "./components/auth-wrapper";

export default function Home() {
  const router = useRouter();

  return (
    <AuthWrapper>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "8px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <div style={{ width: "100%", fontSize: "18px" }}>AI Assistant</div>
        <div className="font-normal text-xs text-gray-400">
          ChatBot is your AI assistant.
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Image
            style={{ borderRadius: "30%", margin: "0 auto" }}
            alt="logo"
            height={100}
            width={100}
            src={Bot}
          />
        </div>
        <Button
          onClick={() => {
            router.push("/chat");
          }}
        >
          Get Started
        </Button>
      </div>
    </AuthWrapper>
  );
}
