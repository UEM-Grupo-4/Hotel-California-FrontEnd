import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import type { Booking } from "../../types/rooms";

type Props = {
  booking: Booking;
  eventName?: string;
  onCancelBooking: () => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMADA":
      return "success";
    case "PENDIENTE":
      return "warning";
    case "RECHAZADA":
      return "error";
    case "CANCELADA":
      return "default";
    default:
      return "default";
  }
};

export function BookingDetailCard({ booking, eventName, onCancelBooking }: Readonly<Props>) {
  const isPending = booking.estado === "PENDIENTE";
  const salaName =
    eventName ??
    booking.reserva_sala?.nombre ??
    booking.reserva_sala?.sala_nombre ??
    (typeof booking.reserva_sala?.sala === "object"
      ? (booking.reserva_sala.sala.nombre ??
        booking.reserva_sala.sala.name ??
        booking.reserva_sala.sala.id)
      : booking.reserva_sala?.sala);

  return (
    <Card sx={{ mt: 2, borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Reserva #{booking.code}
            </Typography>

            <Chip label={booking.estado} color={getStatusColor(booking.estado)} />
          </Box>

          <Divider />

          {isPending && (
            <Alert severity="warning">
              Tu reserva está pendiente de confirmación. Te avisaremos por email.
            </Alert>
          )}

          {booking.estado === "CONFIRMADA" && (
            <Alert severity="success">¡Tu reserva está confirmada! Te esperamos 🎉</Alert>
          )}

          {booking.estado === "RECHAZADA" && (
            <Alert severity="error">La reserva fue rechazada. Contactanos para más info.</Alert>
          )}

          <Stack spacing={1}>
            <Typography>
              <strong>Cliente:</strong> {booking.cliente.nombre} {booking.cliente.apellido_1}
            </Typography>

            <Typography>
              <strong>Email:</strong> {booking.cliente.email}
            </Typography>

            <Typography>
              <strong>Tipo:</strong> {booking.tipo_reserva}
            </Typography>

            <Typography>
              <strong>Fecha creación:</strong> {new Date(booking.fecha_creacion).toLocaleString()}
            </Typography>
          </Stack>

          <Divider />
          {booking.reserva_sala && (
            <Stack spacing={1}>
              <Typography variant="h6">Detalle de la sala</Typography>

              <Typography>
                <strong>Salón:</strong> {salaName}
              </Typography>

              <Typography>
                <strong>Fecha:</strong> {booking.reserva_sala.fecha}
              </Typography>

              <Typography>
                <strong>Horario:</strong> {booking.reserva_sala.hora_inicio} -{" "}
                {booking.reserva_sala.hora_fin}
              </Typography>
            </Stack>
          )}

          {booking.reserva_habitacion && (
            <Stack spacing={1}>
              <Typography variant="h6">Detalle de la habitación</Typography>

              <Typography>
                <strong>Habitación:</strong> {booking.reserva_habitacion.numero_habitacion} -{" "}
                {booking.reserva_habitacion.nombre_habitacion}
              </Typography>

              <Typography>
                <strong>Check-in:</strong> {booking.reserva_habitacion.fecha_inicio}
              </Typography>

              <Typography>
                <strong>Check-out:</strong> {booking.reserva_habitacion.fecha_fin}
              </Typography>
            </Stack>
          )}

          {isPending && (
            <Button variant="outlined" color="error" onClick={onCancelBooking}>
              Cancelar reserva
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
