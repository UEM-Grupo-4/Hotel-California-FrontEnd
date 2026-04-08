import { Card, Grid, List, ListItemButton, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Chat } from "../../UserChatPage/Chat";
import { useConversations } from "../../../api/rooms.hooks";
import { useAdminSocket } from "../../../hooks/useAdminSockets";

function AdminChats() {
  const { data: conversations = [] } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const { newConversation } = useAdminSocket();

  useEffect(() => {
    if (newConversation) {
      console.log("Nueva conversación detectada:", newConversation);
    }
  }, [newConversation]);

  return (
    <Grid container height={"calc(100vh - 220px)"} gap={2}>
      <Grid size={3} sx={{ height: "100%" }}>
        <Card sx={{ height: "100%", overflowY: "auto" }}>
          <List>
            {conversations.map((conversation) => (
              <ListItemButton
                key={conversation.id}
                selected={conversation.id === selectedConversationId}
                onClick={() => setSelectedConversationId(conversation.id)}
              >
                <Box>
                  <Typography fontWeight={600}>{conversation.user_email}</Typography>
                  <Typography variant="caption">Chat #{conversation.id}</Typography>
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Card>
      </Grid>

      <Grid size={"grow"}>
        <Card sx={{ height: "100%" }}>
          {selectedConversationId ? (
            <Chat conversationId={selectedConversationId} sender="admin" />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Selecciona un chat
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminChats;
