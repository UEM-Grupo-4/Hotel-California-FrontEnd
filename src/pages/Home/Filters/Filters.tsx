import { Box, Button, Card, Container, Grid, MenuItem, styled, TextField } from "@mui/material";
import NumberField from "../../../components/NumberField/NumberField";
import DatePickerFilter from "../../../components/DatePickerFilter/DatePickerFilter";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import FiltersTitle from "./FiltersTitle";

function Filters() {
  return (
    <HomeBackground>
      <Container maxWidth="md" sx={{ height: "100%" }}>
        <Grid container flexDirection={"column"} height={"100%"} justifyContent={"space-around"}>
          <FiltersTitle />
          <Card sx={{ p: 2 }}>
            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <Box flex={1}>
                <DatePickerFilter
                  label="Entrada"
                  onChange={(value: PickerValue) => console.log(value)}
                  width={180}
                />
              </Box>

              <Box flex={1}>
                <DatePickerFilter label="Salida" width={180} />
              </Box>

              <Box flex={2}>
                <TextField select label="Tipo" fullWidth size="small">
                  <MenuItem value={"suit"}>Suite</MenuItem>
                </TextField>
              </Box>

              <Box flex={2}>
                <NumberField label="Personas" size="small" max={5} min={1} value={1} />
              </Box>

              <Button variant="contained">Buscar</Button>
            </Box>
          </Card>
        </Grid>
      </Container>
    </HomeBackground>
  );
}

export default Filters;

const HomeBackground = styled("section")({
  width: "100%",
  height: "600px",
  backgroundImage: 'url("https://placehold.co/600x350?text=.")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
});
