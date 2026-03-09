import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

export function AmenityCreateModal({ open, onClose, onCreate }: Readonly<Props>) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nueva Amenity</DialogTitle>

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
        <Button variant="contained" onClick={handleCreate}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
