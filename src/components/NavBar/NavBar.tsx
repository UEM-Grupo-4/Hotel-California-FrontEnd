import { Button, Grid } from "@mui/material";

function NavBar() {
  return (
    <Grid container gap={3} size="auto">
      <Grid>
        <Button>Mis reservas</Button>
      </Grid>
      <Grid>
        <Button>Iniciar sesion</Button>
      </Grid>
    </Grid>
  );
}

export default NavBar;
