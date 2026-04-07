import { Container, Grid, styled } from "@mui/material";
import FiltersTitle from "./FiltersTitle";
import BackgroundImage from "../../../assets/background.jpeg";
import Filters from "./Filters";

function FiltersPage() {
  return (
    <HomeBackground>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Grid container flexDirection={"column"} height={"100%"} justifyContent={"center"}>
          <FiltersTitle />
          <Filters />
        </Grid>
      </Container>
    </HomeBackground>
  );
}

export default FiltersPage;

const HomeBackground = styled("section")({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
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
