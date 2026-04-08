import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type ActionType = "accept" | "reject";

type Props = {
  open: boolean;
  action: ActionType;
  elementName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmActionModal = ({ open, action, elementName, onConfirm, onCancel }: Props) => {
  const isAccept = action === "accept";

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{isAccept ? "Confirmar aceptación" : "Confirmar rechazo"}</DialogTitle>

      <DialogContent>
        <Typography>
          {isAccept ? "¿Querés aceptar" : "¿Querés rechazar"} <b>{elementName ?? "esta reserva"}</b>
          ?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>

        <Button onClick={onConfirm} variant="contained" color={isAccept ? "primary" : "error"}>
          {isAccept ? "Aceptar" : "Rechazar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
