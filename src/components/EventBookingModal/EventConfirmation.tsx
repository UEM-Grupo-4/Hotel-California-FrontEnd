import { Box, Button, DialogContent, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { EventMapped } from "../../types/rooms";

interface Props {
  bookingCode: string;
  event: EventMapped;
  startDate: string;
  startFrom: string;
  durationHours: number;
  onClose: () => void;
}

export function EventConfirmation({
  bookingCode,
  event,
  startDate,
  startFrom,
  durationHours,
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
            bgcolor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </Box>

        <Typography variant="h5" fontWeight="bold">
          Reserva de salón de eventos confirmada
        </Typography>

        <Typography color="text.secondary">Tu salón fue reservado correctamente.</Typography>

        <Box sx={{ p: 2, bgcolor: "rgba(0,0,0,0.05)", borderRadius: 1, width: "90%" }}>
          <Typography>Code: {bookingCode}</Typography>
          <Typography>Evento: {event.name}</Typography>
          <Typography>Inicio: {startDate}</Typography>
          <Typography>Hora: {startFrom}</Typography>
          <Typography>Duración: {durationHours}h</Typography>
        </Box>

        <Grid container gap={2}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Inicio
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(`/mi-reserva?code=${bookingCode}`, { state: { eventName: event.name } })}
          >
            Mi reserva
          </Button>
        </Grid>
      </Stack>
    </DialogContent>
  );
}
