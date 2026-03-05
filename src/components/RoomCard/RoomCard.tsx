import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import type { Room } from "../../types/rooms";

type Props = {
  room: Room;
  onViewDetails: (id: number) => void;
};

export function RoomCard({ room, onViewDetails }: Readonly<Props>) {
  return (
    <StyledCard>
      <CardMedia component="img" image={room.image} alt={room.name} sx={{ width: 300 }} />

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

          <Button variant="outlined" color="primary" onClick={() => onViewDetails(room.id)}>
            Ver detalle
          </Button>
        </RoomFooter>
      </RoomContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
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
