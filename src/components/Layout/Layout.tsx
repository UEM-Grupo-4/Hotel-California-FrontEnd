import { Box, Container, Grid, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import HotelCaliforniaLogo from "../../assets/favicon.png";

const Layout = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <Grid container flexDirection="column" width="100%">
      <Container maxWidth="md">
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid
            container
            size="auto"
            alignItems={"center"}
            gap={1}
            onClick={navigateToHome}
            sx={{ cursor: "pointer" }}
          >
            <Box
              component={"img"}
              src={HotelCaliforniaLogo}
              alt="Hotel California logo"
              sx={{ width: 35, height: 35 }}
            />
            <Typography variant="h1" fontSize={24}>
              Hotel California
            </Typography>
          </Grid>
          <NavBar />
        </Grid>
      </Container>
      <Outlet />
    </Grid>
  );
};

export default Layout;
