import { Card, CardContent, Typography, Chip, Stack, Button } from "@mui/material";
import type { RoomType } from "../../types/rooms";
import { useGetAmenitiesByRoomType } from "../../api/rooms";

type Props = {
  roomType: RoomType;
  onEdit?: (type: RoomType) => void;
};

export function RoomTypeCard({ roomType, onEdit }: Readonly<Props>) {
  const { data: amenities } = useGetAmenitiesByRoomType(roomType.id);

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6">{roomType.name}</Typography>

          <Typography variant="body2">Capacidad: {roomType.capacity} huéspedes</Typography>

          <Typography variant="body2">${roomType.price_per_night} por noche</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {amenities?.map((a) => (
              <Chip key={a.id} label={a.name} size="small" />
            ))}
          </Stack>
        </Stack>

        {onEdit && (
          <Button size="small" onClick={() => onEdit(roomType)}>
            Editar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
