import { Button, Grid, keyframes, styled, Typography } from "@mui/material";
import BackgroundImage from "../../../assets/hotel_room2.jpg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StarIcon from "@mui/icons-material/Star";
import Reviews from "../Reviews/Reviews";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  onScroll?: () => void;
}

function MainBackground({ onScroll }: Readonly<Props>) {
  const navigate = useNavigate();

  return (
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
          La personificación del lujo y el servicio impecable en el corazón <br /> de la capital de
          España.
        </Typography>

        <Button
          sx={{ fontWeight: "bold" }}
          variant="text"
          color="inherit"
          onClick={() => navigate("/reservation")}
          endIcon={<ArrowRightAltIcon />}
        >
          Explorar
        </Button>
        <Reviews />
        <ScrollButton onClick={onScroll} />
      </Grid>
    </ImageBackground>
  );
}

export default MainBackground;

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

const scrollBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-15px);
    opacity: 0.8;
  }
`;

const ScrollButton = styled(KeyboardArrowDownIcon)({
  position: "absolute",
  bottom: 20,
  fontSize: 40,
  animation: `${scrollBounce} 1s infinite`,
  cursor: "pointer",
});
