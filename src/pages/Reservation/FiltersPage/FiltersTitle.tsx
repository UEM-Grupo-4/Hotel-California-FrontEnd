import { Grid, Typography } from "@mui/material";

function FiltersTitle() {
  return (
    <Grid>
      <Typography variant="h2" color="white" fontWeight={"bold"}>
        Reserva tu habitacion <br /> en minutos
      </Typography>
      <Typography variant="h3" mt={3} color="white">
        Mejor precio garantizado
      </Typography>
    </Grid>
  );
}

export default FiltersTitle;
