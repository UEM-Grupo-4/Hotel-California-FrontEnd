import { Container, Grid, styled } from "@mui/material";
import BackgroundImage from "../../../assets/background.jpeg";
import Filters from "./Filters";
import FiltersTitleWrapper from "./FiltersTitleWithWrapper";
import { useHasSearch } from "../../../hooks/useHasSearch";

function FiltersPage() {
  const collapsed = useHasSearch();

  return (
    <HomeBackground collapsed={collapsed}>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Grid
          container
          flexDirection={"column"}
          height={"100%"}
          justifyContent={collapsed ? "flex-end" : "center"}
          pb={collapsed ? 4 : 0}
        >
          <FiltersTitleWrapper collapsed={collapsed} />
          <Filters />
        </Grid>
      </Container>
    </HomeBackground>
  );
}

export default FiltersPage;

const HomeBackground = styled("section")<{ collapsed?: boolean }>(({ collapsed }) => ({
  width: "100%",
  height: collapsed ? "30vh" : "100vh",
  position: "relative",
  overflow: "hidden",
  transition: "height 0.6s ease-in-out",

  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",

  color: "white",
  textAlign: "center",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
    transition: "opacity 0.6s ease-in-out",
    opacity: collapsed ? 1 : 0.6,
  },

  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));
