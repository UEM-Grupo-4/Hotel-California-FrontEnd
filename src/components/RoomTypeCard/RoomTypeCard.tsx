import { Card, CardContent, Typography, Chip, Stack, Grid, IconButton } from "@mui/material";
import type { RoomType } from "../../types/rooms";
import { useRoomsAmenities } from "../../api/rooms";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";

type Props = {
  roomType: RoomType;
  onEdit: (type: RoomType) => void;
};

export function RoomTypeCard({ roomType, onEdit }: Readonly<Props>) {
  const { data: amenities = [] } = useRoomsAmenities();
  const findAmenityById = useCallback(
    (idToFind: number) => {
      return amenities.find((amenity) => amenity.id === idToFind);
    },
    [amenities],
  );

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

              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Typography variant="body2">Capacidad: {roomType.capacity} huéspedes</Typography>

          <Typography variant="body2">${roomType.price_per_night} por noche</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {roomType?.amenities?.map((amenityId) => {
              const amenity = findAmenityById(amenityId);
              if (amenity) return <Chip key={amenity.id} label={amenity.name} size="small" />;
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
