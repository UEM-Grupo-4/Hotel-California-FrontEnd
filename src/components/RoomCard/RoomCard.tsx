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
  onBookRoom?: (room: Room) => void;
  nights?: number;
};

export function RoomCard({
  room,
  isSearch,
  nights,
  onBookRoom,
  mapAmenitiesOnRoomType,
}: Readonly<Props>) {
  const pricePerNight = room?.type?.price_per_night ?? 0;
  const totalPrice = (nights ?? 0) * pricePerNight;

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
        <Typography variant="h5">
          {room?.type?.name} - {room.number}
        </Typography>

        <Divider />

        <RoomFooter container>
          <Typography variant="body1">{room.description}</Typography>
          {!nights && (
            <Typography variant={"body1"}>
              $ {pricePerNight} <span>per night</span>
            </Typography>
          )}

          <AmenitiesChips
            amenities={room?.type?.amenities ?? []}
            mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
          />
          {isSearch && nights && (
            <Grid container justifyContent={"space-between"} sx={{ mt: "auto" }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {nights} night{nights > 1 ? "s" : ""}, {room?.type?.capacity} persona
                  {(room?.type?.capacity ?? 0 > 1) ? "s" : ""}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  Total: $ {totalPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ marginTop: "auto" }}
                onClick={() => onBookRoom?.(room)}
              >
                Reservar
              </Button>
            </Grid>
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
