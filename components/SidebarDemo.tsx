"use client";

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PromptInputBox } from './ui/ai-prompt-box';

export function SidebarDemo() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('Message:', message);
    console.log('Files:', files);
  };

  return (
    <div
      className="flex h-screen"
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
        <div className="w-full max-w-2xl p-4">
          <PromptInputBox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default SidebarDemo;
