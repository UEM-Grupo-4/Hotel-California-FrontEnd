import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { EventMapped } from "../../../types/rooms";
import { weekDaysEvents } from "../../../hooks/useEventForm";
import { find } from "lodash";

type Props = {
  event: EventMapped;
  onEdit?: (event: EventMapped) => void;
  onDelete?: (event: EventMapped) => void;
  isSearch?: boolean;
  onBookEvent?: (event: EventMapped) => void;
  durationHours?: number;
};

export function EventCard({
  event,
  isSearch,
  durationHours,
  onBookEvent,
  onEdit,
  onDelete,
}: Readonly<Props>) {
  const totalPrice = (durationHours ?? 1) * Number(event.pricePerHour);

  return (
    <StyledCard>
      <Box sx={{ width: 300 }}>
        <CardMedia
          component="img"
          image={event.image || "/placeholder.jpg"}
          alt={event.name}
          sx={{ height: 300, width: 300 }}
        />
      </Box>

      <EventContent>
        <Typography variant="h5">{event.name}</Typography>

        <Divider />

        <EventFooter container>
          <Typography variant="body1">{event.description}</Typography>

          <Grid container gap={1}>
            {event?.times?.map((time, index) => {
              const weekDay = find(weekDaysEvents, (day) => day.value === time?.dia_semana);

              return (
                <Grid size={5} key={index}>
                  <Typography>
                    <b>{weekDay?.label}:</b> {time.hora_inicio} a {time.hora_fin}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          {!durationHours && (
            <Typography variant={"body1"}>
              $ {event.pricePerHour} <span>per hour</span>
            </Typography>
          )}

          {onEdit && onDelete && (
            <Grid container gap={2} mt="auto">
              <Grid size={5}>
                <Button
                  fullWidth
                  startIcon={<EditIcon />}
                  variant="contained"
                  onClick={() => onEdit(event)}
                >
                  Editar
                </Button>
              </Grid>
              <Grid size={5}>
                <Button
                  fullWidth
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(event)}
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          )}

          {isSearch && durationHours && (
            <Grid container justifyContent={"space-between"} sx={{ mt: "auto" }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {durationHours} hour{durationHours > 1 ? "s" : ""}, {event.capacity} persona
                  {event.capacity > 1 ? "s" : ""}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  Total: $ {totalPrice}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{ marginTop: "auto" }}
                onClick={() => onBookEvent?.(event)}
              >
                Reservar
              </Button>
            </Grid>
          )}
        </EventFooter>
      </EventContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  display: flex;
`;

const EventContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const EventFooter = styled(Grid)`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  height: 100%;
`;
