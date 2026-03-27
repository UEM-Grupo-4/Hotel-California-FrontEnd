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
import { useBookingByCode } from "../../api/rooms";
import { LoadingPage } from "../../components/LoadingPage/LoadingPage";

const backgroundImage = "https://placehold.co/600x350?text=Suite_Deluxe";

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
        <Card sx={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.9)" }}>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h4" textAlign="center">
                Find your booking
              </Typography>

              <TextField
                label="Booking Code"
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
                Search booking
              </Button>

              {isError && (
                <Typography color="error">Booking not found. Check your code and email.</Typography>
              )}

              {data && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Booking #{data.code}</Typography>

                    <Typography>Status: {data.estado}</Typography>

                    <Typography>
                      Guest: {data.cliente.nombre} {data.cliente.apellido_1}
                    </Typography>

                    {data.reserva_habitacion && (
                      <>
                        <Typography>Check-in: {data.reserva_habitacion.fecha_inicio}</Typography>
                        <Typography>Check-out: {data.reserva_habitacion.fecha_fin}</Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </BookingBackground>
  );
};

const BookingBackground = styled("section")({
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
});

export default MyBooking;
