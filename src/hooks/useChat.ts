import { useEffect, useRef } from "react";
import { useMessages } from "../api/rooms.hooks";

export const useChat = (conversationId: number) => {
  const { data, refetch } = useMessages(conversationId);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/`);

    socket.onmessage = () => {
      refetch();
    };

    socketRef.current = socket;

    return () => socket.close();
  }, [conversationId, refetch]);

  const sendMessage = (message: string, sender: "user" | "admin") => {
    socketRef.current?.send(
      JSON.stringify({
        message,
        sender,
      }),
    );
  };

  return {
    messages: data?.messages ?? [],
    sendMessage,
  };
};
