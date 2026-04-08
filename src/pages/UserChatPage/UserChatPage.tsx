import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Container, Card, CardContent } from "@mui/material";
import { Chat } from "./Chat";
import { isNil } from "lodash";
import Background from "../../assets/swimming-background.jpg";

export const UserChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const conversationId = searchParams.get("conversationId");

  useEffect(() => {
    if (!conversationId || !email) {
      navigate("/contacto");
    }
  }, [conversationId, email, navigate]);

  if (!conversationId || isNil(conversationId)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Card sx={{ width: "100%", mb: 2 }}>
          <CardContent>
            <Typography variant="h5">Soporte - {email}</Typography>
          </CardContent>
        </Card>
        <Box sx={{ height: "60vh" }}>
          {conversationId && <Chat conversationId={Number(conversationId)} sender="user" />}
        </Box>
      </Container>
    </Box>
  );
};
