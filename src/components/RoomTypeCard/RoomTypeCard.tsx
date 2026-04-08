import { Card, CardContent, Typography, Stack, Grid, IconButton } from "@mui/material";
import type { RoomType } from "../../types/rooms";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMapAmenitiesOnRoomType } from "../../hooks/useMapAmenitiesOnRoomType";
import AmenitiesChips from "../AmenitiesChips/AmenitiesChips";

type Props = {
  roomType: RoomType;
  onEdit: (type: RoomType) => void;
  openDelete: (type: RoomType) => void;
};

export function RoomTypeCard({ roomType, onEdit, openDelete }: Readonly<Props>) {
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack spacing={1} width={"100%"}>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6">{roomType.name}</Typography>
            <Grid container gap={1}>
              <IconButton size="small" onClick={() => onEdit(roomType)}>
                <EditIcon />
              </IconButton>

              <IconButton size="small" color="error" onClick={() => openDelete(roomType)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Typography variant="body2">Capacidad: {roomType.capacity} huéspedes</Typography>

          <Typography variant="body2">${roomType.price_per_night} por noche</Typography>

          <AmenitiesChips
            amenities={roomType?.amenities ?? []}
            mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
