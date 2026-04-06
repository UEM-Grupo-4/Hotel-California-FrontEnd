import { Button, Grid, styled, Typography } from "@mui/material";
import RoomsCollection from "./RoomsCollection/RoomsCollection";
import AmenitiesCollection from "./AmenitiesCollection/AmenitiesCollection";
import BackgroundImage from "../../assets/hotel_room2.jpg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useRef } from "react";
import StarIcon from "@mui/icons-material/Star";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  const roomsRef = useRef<HTMLDivElement | null>(null);

  return (
    <Grid>
      <ImageBackground>
        <Grid
          container
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          height={"100%"}
        >
          <Grid container gap={1}>
            {Array.from({ length: 5 }).map((_number, index) => (
              <StarIcon color="primary" key={index} />
            ))}
          </Grid>
          <Typography className="hc-title" variant="h1">
            Lujoso Hotel California
          </Typography>
          <Typography className="hc-description" variant="h2">
            La personificación del lujo y el servicio impecable en el corazón <br /> de la capital
            de España.
          </Typography>

          <Button
            sx={{ fontWeight: "bold" }}
            variant="text"
            color="inherit"
            onClick={() => roomsRef.current?.scrollIntoView({ behavior: "smooth" })}
            endIcon={<ArrowRightAltIcon />}
          >
            Explorar
          </Button>
          <Reviews />
        </Grid>
      </ImageBackground>
      <div ref={roomsRef}>
        <RoomsCollection />
      </div>
      <AmenitiesCollection />
    </Grid>
  );
};

export default Home;

const ImageBackground = styled("section")({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: "white",
  textAlign: "center",
  ".hc-title": {
    fontSize: "80px",
    fontWeight: 700,
  },
  ".hc-description": {
    marginTop: "32px",
    marginBottom: "16px",
    fontSize: "40px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});
