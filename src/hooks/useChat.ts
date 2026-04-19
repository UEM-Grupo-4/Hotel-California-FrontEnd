import { useEffect, useRef, useState } from "react";
import { useCloseChat, useMessages } from "../api/rooms.hooks";

export const useChat = (conversationId: number) => {
  const { data, refetch } = useMessages(conversationId);
  const { mutate: closeChatMutation } = useCloseChat();
  const socketRef = useRef<WebSocket | null>(null);
  const [isClosed, setIsClosed] = useState(data?.is_closed ?? false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClosed(data?.is_closed ?? false);
  }, [data]);

  const closeChat = () => {
    closeChatMutation(conversationId);
  };

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/`);

    socket.onopen = () => {
      console.log("WS conectado");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("WS EVENT:", data);

      if (data.type === "chat_message") {
        refetch();
      }

      if (data.type === "chat_closed") {
        setIsClosed(true);

        refetch();

        socket.close();
      }
    };

    socket.onclose = () => {
      console.log("WS desconectado");
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [conversationId, refetch]);

  const sendMessage = (message: string, sender: "user" | "admin") => {
    if (isClosed) return;

    socketRef.current?.send(
      JSON.stringify({
        message,
        sender,
      }),
    );
  };

  return {
    messages: data?.messages ?? [],
    closeChat,
    sendMessage,
    isClosed,
  };
};
