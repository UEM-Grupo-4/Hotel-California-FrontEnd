import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  elementName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteConfirmModal = ({ open, elementName, onConfirm, onCancel }: Props) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmar eliminación</DialogTitle>

      <DialogContent>
        <Typography>
          ¿Estás seguro que querés borrar <b>{elementName ?? "este elemento"}</b>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>

        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
