import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { useMemo, useState } from "react";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import type { CreateRoomBookingForm, Room } from "../../types/rooms";
import { useCreateRoomBooking } from "../../api/rooms";
import { showSuccess } from "../../utils/showNotification";
import { mapApiErrors } from "../../utils/roomsUtils";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  room: Room;
  startDate: string;
  endDate: string;
};

export function BookingModal({ open, onClose, room, startDate, endDate }: Readonly<Props>) {
  const { mutate, isPending } = useCreateRoomBooking();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [form, setForm] = useState<CreateRoomBookingForm>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (key: keyof CreateRoomBookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const submitButtonDisabled = useMemo(() => Object.values(form).some((value) => !value), [form]);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) return;

    mutate(
      {
        form,
        roomId: room.id,
        startDate,
        endDate,
      },
      {
        onSuccess: (data) => {
          const code = data.code;
          onClose();
          showSuccess("Reserva generada con éxito");
          navigate(`/mi-reserva?code=${code}`);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          const apiErrors = error?.response?.data;
          const mappedErrors = mapApiErrors(apiErrors);
          setErrors(mappedErrors);
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Confirm booking</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {/* Room info */}
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
    </Dialog>
  );
}
