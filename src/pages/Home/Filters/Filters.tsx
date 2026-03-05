import { Box, Button, Card, Container, Grid, MenuItem, styled, TextField } from "@mui/material";
import NumberField from "../../../components/NumberField/NumberField";
import DatePickerFilter from "../../../components/DatePickerFilter/DatePickerFilter";
import FiltersTitle from "./FiltersTitle";
import { useRoomsFilters } from "../../../hooks/useRoomsFilters";
import BackgroundImage from "../../../assets/background.jpeg";

function Filters() {
  const { roomsFilters, onChangeFilters } = useRoomsFilters();

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
                  value={roomsFilters.startDate}
                  onChange={(value) => onChangeFilters("startDate", value)}
                  width={180}
                />
              </Box>

              <Box flex={1}>
                <DatePickerFilter
                  value={roomsFilters.endDate}
                  label="Salida"
                  onChange={(value) => onChangeFilters("endDate", value)}
                  width={180}
                />
              </Box>

              <Box flex={2}>
                <TextField
                  select
                  label="Tipo"
                  name="type"
                  value={roomsFilters.type}
                  onChange={(event) => onChangeFilters("type", event.target.value)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value={"suit"}>Suite</MenuItem>
                </TextField>
              </Box>

              <Box flex={2}>
                <NumberField
                  label="Personas"
                  size="small"
                  max={5}
                  min={1}
                  onValueChange={(value) => onChangeFilters("people", value!)}
                  value={roomsFilters.people}
                />
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
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
});
