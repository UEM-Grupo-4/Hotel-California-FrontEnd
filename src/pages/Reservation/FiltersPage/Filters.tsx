import { useNavigate } from "react-router-dom";
import { useRoomsFilters } from "../../../hooks/useRoomsFilters";
import { useMemo } from "react";
import dayjs from "dayjs";
import { mapFiltersToParams } from "../../../utils/dates";
import { Box, Button, Card, MenuItem, TextField } from "@mui/material";
import DatePickerFilter from "../../../components/DatePickerFilter/DatePickerFilter";
import NumberField from "../../../components/NumberField/NumberField";

function Filters() {
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
      `/reservation/?type=${mappedFilters?.type}&startDate=${mappedFilters?.startDate}&endDate=${mappedFilters?.endDate}&people=${mappedFilters?.people}`,
    );
  };

  return (
    <Card sx={{ p: 2, marginTop: 10 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <Box width={140}>
          <TextField
            id="type-of-reservation"
            select
            label="Tipo de reserva"
            defaultValue="room"
            fullWidth
            value={roomsFilters.type}
            onChange={(event) => onChangeFilters("type", event.target.value)}
            size="small"
          >
            <MenuItem key={"room"} value={"room"}>
              Habitación
            </MenuItem>
            <MenuItem key={"event"} value={"event"}>
              Evento
            </MenuItem>
          </TextField>
        </Box>

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
  );
}

export default Filters;
