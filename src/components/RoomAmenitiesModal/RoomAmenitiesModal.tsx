import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useCreateAmenity, useUpdateAmenity } from "../../api/rooms";
import type { Amenity } from "../../types/rooms";

type Props = {
  open: boolean;
  onClose: () => void;
  amenity: Amenity | null;
};

export function AmenityModal({ open, onClose, amenity }: Readonly<Props>) {
  const { mutate: createAmenity } = useCreateAmenity();
  const { mutate: updateAmenity } = useUpdateAmenity();

  const isEdit = !!amenity;

  const [name, setName] = useState(amenity?.name ?? "");

  const handleSubmit = () => {
    if (isEdit && amenity) {
      updateAmenity({
        id: amenity.id,
        name,
      });
    } else {
      createAmenity({ name });
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? "Editar Amenity" : "Nueva Amenity"}</DialogTitle>

      <DialogContent>
        <TextField
          label="Nombre"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={handleSubmit} disabled={!name.trim()}>
          {isEdit ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
