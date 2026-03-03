import { Container, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <Grid width="100%">
      <Container maxWidth="md">
        <Grid container justifyContent={"space-between"}>
          <Grid size="auto">
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
