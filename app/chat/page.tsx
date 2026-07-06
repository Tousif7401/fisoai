"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/chat/new');
  }, [router]);

  return null;
}
