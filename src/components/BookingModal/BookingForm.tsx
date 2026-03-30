import {
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import type { CreateRoomBookingForm, Room } from "../../types/rooms";

interface Props {
  room: Room;
  startDate: string;
  endDate: string;
  errors: Record<string, string | undefined>;
  submitButtonDisabled: boolean;
  isPending: boolean;
  handleChange: (key: keyof CreateRoomBookingForm, value: string) => void;
  handleSubmit: () => void;
  onClose: () => void;
}

export function BookingForm({
  room,
  startDate,
  endDate,
  errors,
  submitButtonDisabled,
  isPending,
  handleChange,
  handleSubmit,
  onClose,
}: Readonly<Props>) {
  return (
    <>
      <DialogTitle>Confirm booking</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h6">
            {room?.type?.name} - {room.number}
          </Typography>

          <Typography sx={{ display: "flex", gap: 1 }}>
            <FlightLandIcon color="primary" />
            {startDate} → <FlightTakeoffIcon color="primary" />
            {endDate}
          </Typography>

          <TextField
            label="Nombres"
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            label="Apellidos"
            error={!!errors.lastName}
            helperText={errors.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />

          <TextField
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField
            label="Teléfono"
            type="tel"
            placeholder="+34123456789"
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <TextField
            label="Notas"
            multiline
            rows={3}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
          <Grid container size={12} wrap="nowrap" gap={2}>
            <Button variant="outlined" color="error" fullWidth onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitButtonDisabled}
              loading={isPending}
              fullWidth
            >
              Confirm booking
            </Button>
          </Grid>
        </Stack>
      </DialogContent>
    </>
  );
}
