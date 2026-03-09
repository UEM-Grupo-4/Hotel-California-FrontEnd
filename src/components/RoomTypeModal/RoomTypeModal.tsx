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
import type { Amenity } from "../../types/rooms";

type Props = {
  open: boolean;
  amenities: Amenity[];
  onClose: () => void;
  onCreate: (data: {
    name: string;
    capacity: number;
    price_per_night: number;
    amenities: number[];
  }) => void;
};

export function RoomTypeCreateModal({ open, onClose, onCreate, amenities }: Readonly<Props>) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  const handleCreate = () => {
    onCreate({
      name,
      capacity,
      price_per_night: price,
      amenities: selectedAmenities,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nuevo Room Type</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

        <TextField
          label="Capacidad"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />

        <TextField
          label="Precio por noche"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <TextField
          select
          slotProps={{ select: { multiple: true } }}
          label="Amenities"
          value={selectedAmenities}
          // Fix this
          onChange={() => setSelectedAmenities([1])}
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
        <Button variant="contained" onClick={handleCreate}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
