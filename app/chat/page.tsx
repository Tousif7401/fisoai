"use client";

import { useState } from 'react';
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { Sidebar } from '@/components/Sidebar';

export default function ChatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('Message:', message);
    console.log('Files:', files);
    // TODO: Implement actual chat functionality
  };

  return (
    <div
      className="flex h-screen font-['Almarai']"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="p-4 w-[500px]">
          <PromptInputBox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
