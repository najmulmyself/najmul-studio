"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatBubble = dynamic(() => import("@/components/chat-bubble").then((m) => m.ChatBubble), { ssr: false });

// The chat bubble only shows up after a few seconds, so its code loads once
// the page has settled instead of competing with the first paint.
export function LazyChatBubble() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(id);
  }, []);
  return ready ? <ChatBubble /> : null;
}
