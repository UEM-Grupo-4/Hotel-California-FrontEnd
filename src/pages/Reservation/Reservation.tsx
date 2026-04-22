import { Container, Grid } from "@mui/material";
import FiltersPage from "./FiltersPage/FiltersPage";
import RoomDetails from "./RoomDetails/RoomDetail";
import { useSearchParams } from "react-router-dom";
import EventDetails from "./EventDetails/EventDetails";

function Reservation() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  return (
    <Grid>
      <FiltersPage />
      <Container maxWidth="md">{type === "room" ? <RoomDetails /> : <EventDetails />}</Container>
    </Grid>
  );
}

export default Reservation;
