import { Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <Grid container flexDirection="column" width="100%">
      <Container maxWidth="md">
        <NavBar />
      </Container>
      <Outlet />
    </Grid>
  );
};

export default Layout;
