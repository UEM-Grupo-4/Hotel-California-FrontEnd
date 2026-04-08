import { useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { roomsKeys } from "../api/rooms.keys";

export const useAdminSocket = () => {
  const [newConversation, setNewConversation] = useState<{ id: number; email: string } | null>(
    null,
  );
  const lastIdRef = useRef<number | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/admin/");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "new_conversation") {
        const conversation = data.conversation;

        if (conversation.id !== lastIdRef.current) {
          lastIdRef.current = conversation.id;
          setNewConversation(conversation);

          queryClient.invalidateQueries({ queryKey: roomsKeys.conversations });
        }
      }
    };

    return () => socket.close();
  }, [queryClient]);

  return { newConversation };
};
