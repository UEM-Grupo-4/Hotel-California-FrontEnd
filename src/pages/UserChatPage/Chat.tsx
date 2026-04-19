import { useMemo, useState, type SubmitEvent } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useChat } from "../../hooks/useChat";

type Props = {
  conversationId: number;
  sender: "user" | "admin";
};

export const Chat = ({ conversationId, sender }: Props) => {
  const { messages, sendMessage, closeChat, isClosed } = useChat(conversationId);
  const [input, setInput] = useState("");

  const handleSend = (event: SubmitEvent) => {
    event?.preventDefault();
    if (!input.trim()) return;

    sendMessage(input, sender);
    setInput("");
  };
  const isAdmin = useMemo(() => sender === "admin", [sender]);

  return (
    <Card sx={{ height: "100%" }}>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{
          height: "100%",
          padding: 3,
          position: "relative",
        }}
      >
        <Grid sx={{ overflowY: "auto", mb: 2 }}>
          {isAdmin && (
            <Grid textAlign={"end"}>
              <Button variant="contained" color="error" onClick={closeChat}>
                Cerrar chat
              </Button>
            </Grid>
          )}
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

        {isClosed && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              color: "white",
              fontSize: 18,
              textAlign: "center",
              padding: 2,
            }}
          >
            Este chat fue cerrado por el administrador.
            <br />
            No puedes enviar más mensajes.
          </Box>
        )}

        <form onSubmit={handleSend}>
          <Grid sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={isAdmin ? "Se amable con el cliente" : "Mandar mensaje"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isClosed}
            />
            <Button type="submit" variant="contained" disabled={isClosed}>
              Enviar
            </Button>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
};
