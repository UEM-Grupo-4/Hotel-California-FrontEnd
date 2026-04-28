import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useEventForm } from "../../hooks/useEventForm";
import type { EventMapped } from "../../types/rooms";

type Props = {
  open: boolean;
  event: EventMapped | null;
  onClose: () => void;
};

export function EventCreateModal({ open, onClose, event }: Readonly<Props>) {
  const {
    isEdit,
    form,
    sameSchedule,
    commonSchedule,
    schedules,
    isDisabled,
    setSameSchedule,
    setCommonSchedule,
    handleChange,
    handleImageChange,
    handleAddSchedule,
    handleScheduleChange,
    getAvailableDays,
    onSubmit,
  } = useEventForm(event, onClose);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? "Editar Salón de evento" : "Nuevo Salón de evento"}</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nombre" value={form.name} onChange={handleChange("name")} />

        <TextField
          label="Descripción"
          value={form.description}
          onChange={handleChange("description")}
        />

        <TextField
          label="Capacidad"
          type="number"
          value={form.capacity}
          onChange={handleChange("capacity")}
        />

        <TextField
          label="Precio por hora"
          type="number"
          value={form.pricePerHour}
          onChange={handleChange("pricePerHour")}
        />

        <TextField select label="Estado" value={form.status} onChange={handleChange("status")}>
          <MenuItem value="DISPONIBLE">Disponible</MenuItem>
          <MenuItem value="MANTENIMIENTO">Mantenimiento</MenuItem>
          <MenuItem value="FUERA_DE_SERVICIO">Fuera de servicio</MenuItem>
        </TextField>

        <Typography>{form?.image?.name}</Typography>
        <Button variant="outlined" component="label">
          Subir imagen
          <input hidden type="file" accept="image/*" onChange={handleImageChange} />
        </Button>

        <Box mt={2}>
          <Typography variant="h6">Horarios</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={sameSchedule}
                disabled={isEdit}
                onChange={(e) => setSameSchedule(e.target.checked)}
              />
            }
            label="Mismo horario todos los días"
          />
          {isEdit && (
            <Typography color="error">
              Para modificar horarios hay que eliminar el evento
            </Typography>
          )}

          {sameSchedule ? (
            <Box sx={{ display: "flex", gap: 2 }} mt={2}>
              <TextField
                type="time"
                label="Inicio"
                value={commonSchedule.startTime || ""}
                slotProps={{ inputLabel: { shrink: true } }}
                onChange={(e) =>
                  setCommonSchedule((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />

              <TextField
                type="time"
                label="Fin"
                value={commonSchedule.endTime || ""}
                slotProps={{ inputLabel: { shrink: true } }}
                onChange={(e) =>
                  setCommonSchedule((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {schedules.map((schedule, index) => (
                <Box key={index} display="flex" mt={2} gap={1}>
                  <TextField
                    select
                    label="Día"
                    value={schedule.dayOfWeek}
                    onChange={(e) =>
                      handleScheduleChange(index, "dayOfWeek", Number(e.target.value))
                    }
                  >
                    {getAvailableDays(index).map((d) => (
                      <MenuItem key={d.value} value={d.value}>
                        {d.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    type="time"
                    label="Inicio"
                    value={schedule.startTime || ""}
                    slotProps={{ inputLabel: { shrink: true } }}
                    onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                  />

                  <TextField
                    type="time"
                    label="Fin"
                    value={schedule.endTime || ""}
                    slotProps={{ inputLabel: { shrink: true } }}
                    onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                  />
                </Box>
              ))}

              {!isEdit && (
                <Button
                  onClick={handleAddSchedule}
                  variant="contained"
                  sx={{ width: 200 }}
                  disabled={isEdit}
                >
                  Agregar horario
                </Button>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>

        <Button variant="contained" onClick={onSubmit} disabled={isDisabled}>
          {isEdit ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
