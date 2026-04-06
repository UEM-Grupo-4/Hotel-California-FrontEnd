import { Grid } from "@mui/material";
import RoomsCollection from "./RoomsCollection/RoomsCollection";
import AmenitiesCollection from "./AmenitiesCollection/AmenitiesCollection";
import { useRef } from "react";
import MainBackground from "./MainBackground/MainBackground";

const Home = () => {
  const roomsRef = useRef<HTMLDivElement | null>(null);

  return (
    <Grid>
      <MainBackground onScroll={() => roomsRef.current?.scrollIntoView({ behavior: "smooth" })} />
      <Grid sx={{ backgroundColor: "#FAFAFA" }} ref={roomsRef}>
        <RoomsCollection />
      </Grid>
      <AmenitiesCollection />
    </Grid>
  );
};

export default Home;
