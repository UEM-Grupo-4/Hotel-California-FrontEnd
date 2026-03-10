import {
  Box,
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
  onEdit?: (room: Room) => void;
};

export function RoomCard({ room }: Readonly<Props>) {
  return (
    <StyledCard>
      <Box sx={{ width: 200 }}>
        <CardMedia component="img" image={room?.image} alt={room.description} />
      </Box>

      <RoomContent>
        <Typography variant="h4">{room?.type?.name}</Typography>

        <Divider />

        <RoomFooter container>
          <Typography variant="h6">
            $ {room?.type?.price_per_night} <span>por noche</span>
          </Typography>
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
  justify-content: space-between;
  margin-top: 8px;
`;
