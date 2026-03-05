import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  CardMedia,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useGetRoom } from "../../api/rooms";

type Props = {
  open: boolean;
  roomId: number;
  onClose: () => void;
};

export function RoomModal({ open, roomId, onClose }: Readonly<Props>) {
  const { data: room, isLoading } = useGetRoom(roomId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {isLoading && <CircularProgress sx={{ m: 4 }} />}

      {room && (
        <>
          <DialogTitle>{room.name}</DialogTitle>

          <DialogContent>
            <CardMedia component="img" image={room.image} sx={{ borderRadius: 2, mb: 2 }} />

            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body1">Tamaño: {room.squareMeters} m²</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="body1">Huéspedes: {room.maxGuests}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="body1">Cama: {room.bedType}</Typography>
              </Grid>

              <Grid size={6}>
                <Typography variant="body1">Vista: {room.sight}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">${room.price} / noche</Typography>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
