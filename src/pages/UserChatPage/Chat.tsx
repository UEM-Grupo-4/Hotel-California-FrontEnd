import { useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useChat } from "../../hooks/useChat";

type Props = {
  conversationId: number;
  sender: "user" | "admin";
};

export const Chat = ({ conversationId, sender }: Props) => {
  const { messages, sendMessage } = useChat(conversationId);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input, sender);
    setInput("");
  };

  return (
    <Card sx={{ height: "100%" }}>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{
          height: "100%",
          padding: 3,
        }}
      >
        {sender === "admin" && (
          <Grid textAlign={"end"}>
            <Button variant="contained" color="error">
              Cerrar chat
            </Button>
          </Grid>
        )}
        <Grid sx={{ overflowY: "auto", mb: 2 }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                textAlign: msg.sender === sender ? "right" : "left",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "inline-block",
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor: msg.sender === sender ? "#1976d2" : "#eee",
                  color: msg.sender === sender ? "white" : "black",
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))}
        </Grid>

        {/* input */}
        <Grid sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSend} variant="contained">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
