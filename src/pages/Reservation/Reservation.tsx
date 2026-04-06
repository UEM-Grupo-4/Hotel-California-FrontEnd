import { Container, Grid } from "@mui/material";
import Filters from "./Filters/Filters";
import RoomDetails from "../Home/RoomDetails/RoomDetail";

function Reservation() {
  return (
    <Grid>
      <Filters />
      <Container maxWidth="md">
        <RoomDetails />
      </Container>
    </Grid>
  );
}

export default Reservation;
