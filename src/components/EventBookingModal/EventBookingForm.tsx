import {
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { EventMapped } from "../../types/rooms";
import dayjs from "dayjs";

interface Props {
  event: EventMapped;
  startDate: string;
  startFrom: string;
  durationHours: number;
  submitButtonDisabled: boolean;
  isPending: boolean;
  handleChange: (key: string, value: string) => void;
  handleSubmit: () => void;
  onClose: () => void;
}

export function EventBookingForm({
  event,
  startDate,
  startFrom,
  durationHours,
  submitButtonDisabled,
  isPending,
  handleChange,
  handleSubmit,
  onClose,
}: Readonly<Props>) {
  return (
    <>
      <DialogTitle variant="h4" fontWeight="bold">
        Confirmar reserva del evento
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="h6">{event?.name}</Typography>

          <Typography sx={{ display: "flex", gap: 1 }}>
            <AccessTimeIcon color="primary" />
            {dayjs(startDate).format("DD-MM-YYYY")} a las {startFrom} → {durationHours}h
          </Typography>

          <TextField label="Nombres" onChange={(e) => handleChange("name", e.target.value)} />

          <TextField label="Apellidos" onChange={(e) => handleChange("lastName", e.target.value)} />

          <TextField
            type="email"
            label="Email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextField label="Teléfono" onChange={(e) => handleChange("phone", e.target.value)} />

          <TextField
            label="Notas"
            multiline
            rows={3}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <Grid container gap={2}>
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
              Confirmar evento
            </Button>
          </Grid>
        </Stack>
      </DialogContent>
    </>
  );
}
