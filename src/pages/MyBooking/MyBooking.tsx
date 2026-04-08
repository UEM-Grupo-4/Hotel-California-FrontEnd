import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useBookingSearchParams } from "../../hooks/useBookingSearchParams";
import { LoadingPage } from "../../components/LoadingPage/LoadingPage";
import BackgroundImage from "../../assets/wallpaper_reserva.jpg";
import { BookingDetailCard } from "./BookindDetailCard";
import { useBookingByCode } from "../../api/rooms.hooks";

const MyBooking = () => {
  const { code: initialCode } = useBookingSearchParams();

  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");

  const { data, isLoading, isError, refetch } = useBookingByCode(code, email);

  const handleSearch = () => {
    if (!code || !email) return;
    refetch();
  };

  return (
    <BookingBackground>
      {isLoading && <LoadingPage open={isLoading} />}
      <Container maxWidth="sm">
        {!data && (
          <Card sx={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.9)" }}>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h4" textAlign="center">
                  Buscar mi reserva
                </Typography>

                <TextField
                  label="Código de reserva"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                />

                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button variant="contained" onClick={handleSearch}>
                  Buscar
                </Button>

                {isError && !data && (
                  <Typography color="error">
                    No encontramos tu reserva. Revisá los datos.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}
        {data && <BookingDetailCard booking={data} />}
      </Container>
    </BookingBackground>
  );
};

const BookingBackground = styled("section")({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
});

export default MyBooking;
