import { Card, CardContent, CardMedia, Grid, styled, Typography } from "@mui/material";
import type { Amenity, Room } from "../../../types/rooms";
import AmenitiesChips from "../../../components/AmenitiesChips/AmenitiesChips";

interface Props {
  room: Room;
  mapAmenitiesOnRoomType: (amenityId: number) => Amenity | undefined;
}

function RoomCard({ room, mapAmenitiesOnRoomType }: Readonly<Props>) {
  return (
    <StyledCard>
      <Grid container>
        <Grid width={"100%"} size={{ xs: 12, md: 6 }}>
          <StyledCardContent>
            <Typography variant="h3" fontWeight={"bold"}>
              {room.type?.name}
            </Typography>
            <Typography variant="h6">{room.description}</Typography>
            <Grid container wrap="wrap">
              <AmenitiesChips
                amenities={room?.type?.amenities ?? []}
                mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
              />
            </Grid>
            <Typography sx={{ marginTop: "auto" }} variant="h6" fontWeight={"bold"}>
              Desde: ${room?.type?.price_per_night}/Noche
            </Typography>
          </StyledCardContent>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardMedia
            component="img"
            image={room?.image}
            alt={room.description}
            sx={{
              height: 400,
              width: 300,
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
}

export default RoomCard;

const StyledCard = styled(Card)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  textAlign: "start",
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  height: "100%",
  width: "90%",
  paddingTop: "40px",
});
