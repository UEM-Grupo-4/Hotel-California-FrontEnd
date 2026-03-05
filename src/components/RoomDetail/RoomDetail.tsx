import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { useRooms } from "../../api/rooms";

function RoomDetail() {
  const { data: rooms, isLoading } = useRooms();

  if (isLoading) return <span>Loading...</span>;
  if (!rooms) return <span>No rooms</span>;

  return (
    <Box>
      {rooms.map((room, index) => (
        <Card key={index} sx={{ display: "flex", marginTop: 3 }}>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image={room.image}
            alt={`Image of ${room.name}`}
          />
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" , pb: "16px !important"}}>
            <Typography variant="h4">{room.name}</Typography>
            <Grid container gap={1} alignItems={"center"}>
              <Typography variant="h6">{`${room.squareMeters} m`}<sup>2</sup></Typography> •
              <Typography variant="h6">{room.bedType}</Typography> •
              <Typography variant="h6">Máx {room.maxGuests} Huéspedes</Typography> •
              <Typography variant="h6">Vista {room.sight}</Typography>
            </Grid>
            <Divider />
            <Grid container justifyContent={"space-between"} mt={1}>
              <Typography variant="h6">
                $ {room.price} <span>por noche</span>
              </Typography>
              <Button variant="contained" color="primary">
                Ver detalle
              </Button>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default RoomDetail;
