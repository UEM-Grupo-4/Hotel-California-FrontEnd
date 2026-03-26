import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import type { Amenity, Room } from "../../types/rooms";
import AmenitiesChips from "../AmenitiesChips/AmenitiesChips";

type Props = {
  room: Room;
  mapAmenitiesOnRoomType: (amenityId: number) => Amenity | undefined;
  onEdit?: (room: Room) => void;
  isSearch?: boolean;
};

export function RoomCard({ room, mapAmenitiesOnRoomType, isSearch }: Readonly<Props>) {
  return (
    <StyledCard>
      <Box sx={{ width: 300 }}>
        <CardMedia
          component="img"
          image={room?.image}
          alt={room.description}
          sx={{ height: 300, width: 300 }}
        />
      </Box>

      <RoomContent>
        <Typography variant="h4">
          {room?.type?.name} - {room.number}
        </Typography>

        <Divider />

        <RoomFooter container>
          <Typography variant="h6">{room.description}</Typography>
          <Typography variant="h6">
            $ {room?.type?.price_per_night} <span>por noche</span>
          </Typography>
          <AmenitiesChips
            amenities={room?.type?.amenities ?? []}
            mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
          />
          {isSearch && (
            <Button variant="contained" sx={{ marginTop: "auto" }}>
              Reservar
            </Button>
          )}
        </RoomFooter>
      </RoomContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  display: flex;
`;

const RoomContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const RoomFooter = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  height: 100%;
`;
