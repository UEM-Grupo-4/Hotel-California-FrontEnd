import { Container, Grid } from "@mui/material";
import Filters from "./Filters/Filters";
import RoomDetails from "./RoomDetails/RoomDetail";
import { useRef } from "react";

const Home = () => {
  const resultsRef = useRef<HTMLDivElement | null>(null);

  return (
    <Grid>
      <Filters
        onSearchScroll={() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <Container ref={resultsRef} maxWidth="md" sx={{ px: 2, py: 4 }}>
        <RoomDetails />
      </Container>
    </Grid>
  );
};

export default Home;
