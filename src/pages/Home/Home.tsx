import { Container, Grid } from "@mui/material";
import Filters from "./Filters/Filters";
import RoomDetail from "../../components/RoomDetail/RoomDetail";

const Home = () => {
  return (
    <Grid>
      <Filters />
      <Container maxWidth="md" sx={{ px: 2, py: 4 }}>
        <RoomDetail />
      </Container>
    </Grid>
  );
};

export default Home;
