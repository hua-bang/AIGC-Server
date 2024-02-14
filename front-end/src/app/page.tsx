"use client";
import './globals.css'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Home() {

  const router = useRouter();

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '8px', textAlign: 'center', fontWeight: 'bold' }}>
      <div style={{ width: '100%', fontSize: '18px' }}>AI Assistant</div>
      <div className='font-normal text-xs text-gray-400'>ChatBot is your AI assistant.</div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          style={{ borderRadius: "30%", margin: '0 auto' }}
          alt="logo"
          height={100}
          width={100}
          src={
            "https://files.oaiusercontent.com/file-NApY0rCxRGeqNC3z1Ha33WG0?se=2123-10-17T02%3A03%3A58Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da15730bf-2048-47f4-b826-e02a67e31788.png&sig=FgYSAua12finxV6tdKL9BTJaDtHChokO77KKdMbI30U%3D"
          }
        />
      </div>
      <Button onClick={() => { router.push('/chat') }}>Get Started</Button>
    </div>
  )
}
