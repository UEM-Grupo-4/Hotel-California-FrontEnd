import { Container, Grid } from "@mui/material";
import FiltersPage from "./FiltersPage/FiltersPage";
import RoomDetails from "./RoomDetails/RoomDetail";

function Reservation() {
  return (
    <Grid>
      <FiltersPage />
      <Container maxWidth="md">
        <RoomDetails />
      </Container>
    </Grid>
  );
}

export default Reservation;
