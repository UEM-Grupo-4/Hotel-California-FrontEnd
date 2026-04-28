import { useNavigate } from "react-router-dom";
import { useRoomsFilters } from "../../../hooks/useRoomsFilters";
import dayjs from "dayjs";
import { Box, Button, Card, MenuItem, TextField } from "@mui/material";
import DatePickerFilter from "../../../components/DatePickerFilter/DatePickerFilter";
import NumberField from "../../../components/NumberField/NumberField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useMemo } from "react";

function Filters() {
  const { roomsFilters, onChangeFilters, onChangeType, isSearchDisabled, getQueryParams } =
    useRoomsFilters();

  const navigate = useNavigate();

  const handleSearch = () => {
    if (isSearchDisabled) return;

    const params = getQueryParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = new URLSearchParams(params as any).toString();

    navigate(`/reservation/?${query}`);
  };

  const isTypeEvent = useMemo(() => {
    return roomsFilters.type === "event";
  }, [roomsFilters.type]);

  return (
    <Card sx={{ p: 2, marginTop: 10 }}>
      <Box display="flex" gap={2} alignItems="center" flexWrap={"wrap"}>
        <Box width={140}>
          <TextField
            id="type-of-reservation"
            select
            label="Tipo de reserva"
            defaultValue="room"
            fullWidth
            value={roomsFilters.type}
            onChange={(e) => onChangeType(e.target.value as "room" | "event")}
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
        {isTypeEvent ? (
          <>
            <DateTimePicker
              label="Día y hora"
              value={roomsFilters.eventStart}
              minDate={dayjs()}
              onChange={(value) => onChangeFilters("eventStart", value)}
              views={["year", "month", "day", "hours"]}
              slotProps={{ textField: { size: "small" } }}
            />
            <Box>
              <NumberField
                label="Horas"
                size="small"
                min={1}
                max={8}
                value={roomsFilters.durationHours}
                onValueChange={(value) => onChangeFilters("durationHours", value!)}
              />
            </Box>
          </>
        ) : (
          <>
            <DatePickerFilter
              label="Entrada"
              value={roomsFilters.startDate}
              minDate={dayjs()}
              onChange={(value) => onChangeFilters("startDate", value)}
              width={180}
            />

            <DatePickerFilter
              value={roomsFilters.endDate}
              label="Salida"
              minDate={roomsFilters.startDate ?? undefined}
              onChange={(value) => onChangeFilters("endDate", value)}
              width={180}
            />
          </>
        )}

        <Box flex={1} minWidth={150}>
          <NumberField
            label="Personas"
            size="small"
            max={isTypeEvent ? 100 : 5}
            min={1}
            onValueChange={(value) => onChangeFilters("people", value!)}
            value={roomsFilters.people}
          />
        </Box>

        <Button variant="contained" onClick={handleSearch} disabled={isSearchDisabled}>
          Buscar
        </Button>
      </Box>
    </Card>
  );
}

export default Filters;
