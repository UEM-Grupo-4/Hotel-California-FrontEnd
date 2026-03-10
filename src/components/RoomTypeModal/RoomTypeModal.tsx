import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import type { RoomType } from "../../types/rooms";
import { useCreateRoomType, useRoomsAmenities, useUpdateRoomType } from "../../api/rooms";

type FormState = {
  name: string;
  capacity: number;
  price_per_night: number;
  amenities: number[];
};

type Props = {
  open: boolean;
  roomType: RoomType | null;
  onClose: () => void;
};

export function RoomTypeCreateModal({
  open,
  onClose,
  roomType: originalRoomType,
}: Readonly<Props>) {
  const { data: amenities = [] } = useRoomsAmenities();
  const { mutate: createAmenity } = useCreateRoomType();
  const { mutate: updateAmenity } = useUpdateRoomType();

  const isEdit = !!originalRoomType;

  const [form, setForm] = useState<FormState>(
    originalRoomType ?? {
      name: "",
      capacity: 1,
      price_per_night: 0,
      amenities: [],
    },
  );

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      field === "capacity" || field === "price_per_night"
        ? Number(event.target.value)
        : event.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenitiesChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any,
  ) => {
    const value = event?.target?.value as number[];

    setForm((prev) => ({
      ...prev,
      amenities: value,
    }));
  };

  const handleSubmit = () => {
    if (isEdit && originalRoomType) {
      updateAmenity({
        id: originalRoomType.id,
        ...form,
      });
    } else {
      createAmenity(form);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{originalRoomType ? "Editar Room Type" : "Nuevo Room Type"}</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: "12px !important" }}
      >
        <TextField label="Nombre" value={form.name} onChange={handleChange("name")} />

        <TextField
          label="Capacidad"
          type="number"
          value={form.capacity}
          onChange={handleChange("capacity")}
        />

        <TextField
          label="Precio por noche"
          type="number"
          value={form.price_per_night}
          onChange={handleChange("price_per_night")}
        />

        <TextField
          select
          label="Amenities"
          value={form.amenities}
          onChange={handleAmenitiesChange}
          slotProps={{ select: { multiple: true } }}
        >
          {amenities.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit} disabled={!form.name.trim()}>
          {originalRoomType ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
