import { Button, Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid width="100%">
      <Container maxWidth="md">
        <Grid container justifyContent={"space-between"}>
          <Grid size="auto">Hotel California</Grid>
          <Grid container gap={3} size="auto">
            <Grid>
              <Button>Mis reservas</Button>
            </Grid>
            <Grid>
              <Button>Iniciar sesion</Button>
            </Grid>
          </Grid>
        </Grid>
        <Outlet />
      </Container>
    </Grid>
  );
};

export default Layout;
