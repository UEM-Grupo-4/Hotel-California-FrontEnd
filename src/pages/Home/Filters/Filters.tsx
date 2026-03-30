import { Box, Button, Card, Container, Grid, styled } from "@mui/material";
import NumberField from "../../../components/NumberField/NumberField";
import DatePickerFilter from "../../../components/DatePickerFilter/DatePickerFilter";
import FiltersTitle from "./FiltersTitle";
import { useRoomsFilters } from "../../../hooks/useRoomsFilters";
import BackgroundImage from "../../../assets/background.jpeg";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { mapFiltersToParams } from "../../../utils/dates";
import dayjs from "dayjs";

interface Props {
  onSearchScroll: () => void;
}

function Filters({ onSearchScroll }: Readonly<Props>) {
  const { roomsFilters, onChangeFilters } = useRoomsFilters();
  const navigate = useNavigate();

  const isInvalidDateRange = useMemo(() => {
    if (!roomsFilters.startDate || !roomsFilters.endDate) return false;

    return dayjs(roomsFilters.endDate).isBefore(dayjs(roomsFilters.startDate));
  }, [roomsFilters]);

  const disabledSearchButton = useMemo(
    () =>
      !roomsFilters.startDate ||
      !roomsFilters.endDate ||
      !roomsFilters.people ||
      isInvalidDateRange,
    [roomsFilters, isInvalidDateRange],
  );

  const handleSearch = () => {
    if (disabledSearchButton) return;
    const mappedFilters = mapFiltersToParams(roomsFilters);

    navigate(
      `/?startDate=${mappedFilters?.startDate}&endDate=${mappedFilters?.endDate}&people=${mappedFilters?.people}`,
    );

    setTimeout(() => {
      onSearchScroll?.();
    }, 100);
  };

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
                  minDate={roomsFilters.startDate ?? undefined}
                  onChange={(value) => onChangeFilters("endDate", value)}
                  width={180}
                />
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

              <Button variant="contained" onClick={handleSearch} disabled={disabledSearchButton}>
                Buscar
              </Button>
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
