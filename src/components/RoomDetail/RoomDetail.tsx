import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useRooms } from "../../api/rooms";

function RoomDetail() {
  const { data: rooms, isLoading } = useRooms();

  if (isLoading) return <span>Loading...</span>;
  if (!rooms) return <span>No rooms</span>;

  return (
    <Box>
      {rooms.map((room, index) => (
        <RoomCard key={index}>
          <CardMedia
            component={"img"}
            image={room.image}
            alt={`Image of ${room.name}`}
            sx={{ width: 300 }}
          />

          <RoomContent>
            <Typography variant="h4">{room.name}</Typography>

            <RoomInfoRow container>
              <Typography variant="h6">
                {room.squareMeters} m<sup>2</sup>
              </Typography>
              •<Typography variant="h6">{room.bedType}</Typography>•
              <Typography variant="h6">Máx {room.maxGuests} huéspedes</Typography>•
              <Typography variant="h6">Vista {room.sight}</Typography>
            </RoomInfoRow>

            <Divider />

            <RoomFooter container>
              <Typography variant="h6">
                $ {room.price} <span>por noche</span>
              </Typography>

              <Button variant="contained">Ver detalle</Button>
            </RoomFooter>
          </RoomContent>
        </RoomCard>
      ))}
    </Box>
  );
}

export default RoomDetail;

const RoomCard = styled(Card)`
  display: flex;
  margin-top: 24px;
`;

const RoomContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const RoomInfoRow = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RoomFooter = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
