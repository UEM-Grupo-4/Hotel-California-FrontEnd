import { Box, Button, DialogContent, Grid, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Room } from "../../types/rooms";

interface Props {
  bookingCode: string;
  room: Room;
  startDate: string;
  endDate: string;
  onClose: () => void;
}

export function ConfirmationContent({
  startDate,
  endDate,
  room,
  bookingCode,
  onClose,
}: Readonly<Props>) {
  const navigate = useNavigate();

  return (
    <DialogContent>
      <Stack spacing={1} alignItems="center" textAlign="center">
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </Box>

        <Typography variant="h5" fontWeight="bold">
          Pedido de reserva creada con éxito!
        </Typography>

        <Typography color="text.secondary" variant="h6">
          Hemos recibido tu reserva.
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Por favor revisa tu email para obtener mas detalles de la reserva.
        </Typography>
        <Typography color="warning" fontSize={12}>
          Recuerda que esto es un pedido de reserva, lo cual puede ser rechazada.
        </Typography>

        <InfoContainer>
          <InformationField title="Booking Code" value={bookingCode} />
          <InformationField title="Nombre habitación" value={room?.type?.name ?? ""} />
          <InformationField title="Fecha entrada" value={startDate} />
          <InformationField title="Fecha salida" value={endDate} />
        </InfoContainer>

        <Grid container gap={2}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Volver al inicio
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(`/mi-reserva?code=${bookingCode}`)}
          >
            Mi reserva
          </Button>
        </Grid>
      </Stack>
    </DialogContent>
  );
}

const InformationField = ({ title, value }: { title: string; value: string }) => {
  return (
    <Grid container textAlign={"center"} alignItems={"center"} justifyContent={"center"} gap={1}>
      <Typography variant="body1">{title}:</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Grid>
  );
};

const InfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  margin-top: 12px !important;
  margin-bottom: 12px !important;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
  width: 90%;
`;
