import { Container, Grid } from "@mui/material";
import Filters from "./Filters/Filters";
import RoomDetails from "./RoomDetails/RoomDetail";

const Home = () => {
  return (
    <Grid>
      <Filters />
      <Container maxWidth="md" sx={{ px: 2, py: 4 }}>
        <RoomDetails />
      </Container>
    </Grid>
  );
};

export default Home;
