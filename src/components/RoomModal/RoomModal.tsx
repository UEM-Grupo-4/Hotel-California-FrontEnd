import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Room, RoomRequest } from "../../types/rooms";
import { useCreateRoom, useRoomsTypes, useUpdateRoom } from "../../api/rooms.hooks";

type Props = {
  open: boolean;
  room: Room | null;
  onClose: () => void;
};

export function RoomCreateModal({ open, onClose, room: originalRoom }: Readonly<Props>) {
  const { data: roomTypes = [] } = useRoomsTypes();

  const { mutate: createRoom } = useCreateRoom();
  const { mutate: updateRoom } = useUpdateRoom();

  const isEdit = !!originalRoom;

  const [form, setForm] = useState<RoomRequest>({
    number: originalRoom?.number ?? "",
    description: originalRoom?.description ?? "",
    type: originalRoom?.type ?? undefined,
    image: undefined,
  });

  const handleChange =
    (field: keyof RoomRequest) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "type" ? Number(event.target.value) : event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setForm((prev) => ({
      ...prev,
      image: file ?? undefined,
    }));
  };

  const handleSubmit = () => {
    if (isEdit && originalRoom) {
      updateRoom({
        id: originalRoom.id,
        ...form,
      });
    } else {
      createRoom(form);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Editar Room" : "Nueva Room"}</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: "12px !important" }}
      >
        <TextField label="Número" value={form.number} onChange={handleChange("number")} />

        <TextField
          label="Descripción"
          value={form.description}
          onChange={handleChange("description")}
        />

        <TextField select label="Room Type" value={form?.type} onChange={handleChange("type")}>
          {roomTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

        <Typography>{form.image?.name}</Typography>
        <Button variant="outlined" component="label">
          Subir imagen
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit} disabled={!form.number.trim()}>
          {isEdit ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
