import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAcceptBooking, useBookings, useRejectBooking } from "../../../api/rooms.hooks";
import { Button, Grid, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import type { Booking } from "../../../types/rooms";
import { ConfirmActionModal } from "../../../components/ConfirmActionModal/ConfirmActionModal";
import { isEmpty } from "lodash";

const formatDate = (date?: string) => {
  if (!date) return undefined;

  return dayjs(date).format("DD/MM/YYYY");
};

export default function AdminBookings() {
  const { data } = useBookings();
  const { mutate: acceptBookingMutation } = useAcceptBooking();
  const { mutate: rejectBookingMutation } = useRejectBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionType, setActionType] = useState<"accept" | "reject" | null>(null);

  const openConfirm = (booking: Booking, action: "accept" | "reject") => {
    setSelectedBooking(booking);
    setActionType(action);
  };

  const closeConfirm = () => {
    setSelectedBooking(null);
    setActionType(null);
  };

  const handleConfirm = () => {
    if (!selectedBooking || !actionType) return;

    if (actionType === "accept") {
      acceptBookingMutation(selectedBooking.id);
    } else {
      rejectBookingMutation(selectedBooking.id);
    }

    closeConfirm();
  };

  const mappedData = useMemo(() => {
    return data?.filter((book) => book.estado === "PENDIENTE");
  }, [data]);

  if (isEmpty(mappedData)) return <h5>No hay reservas para revisar</h5>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre cliente</TableCell>
            <TableCell align="right">Tipo de reserva</TableCell>
            <TableCell align="right">Código reserva</TableCell>
            <TableCell align="right">Fecha inicio</TableCell>
            <TableCell align="right">Fecha fin</TableCell>
            <TableCell align="right">Evento fecha</TableCell>
            <TableCell align="right">Evento Horario</TableCell>
            <TableCell align="right">Notas</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedData?.map((booking) => (
            <TableRow
              key={booking.cliente.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {booking.cliente.apellido_1} {booking.cliente.nombre}
              </TableCell>
              <TableCell align="right">{booking.tipo_reserva}</TableCell>
              <TableCell align="right">{booking.code}</TableCell>
              <TableCell align="right">
                {formatDate(booking?.reserva_habitacion?.fecha_inicio) ?? "-"}
              </TableCell>
              <TableCell align="right">
                {formatDate(booking?.reserva_habitacion?.fecha_fin) ?? "-"}
              </TableCell>
              <TableCell align="right">{formatDate(booking?.reserva_sala?.fecha) ?? "-"}</TableCell>
              <TableCell align="right">
                {booking?.reserva_sala?.hora_inicio} - {booking?.reserva_sala?.hora_fin}
              </TableCell>
              <TableCell align="right">
                <div>
                  <Tooltip title={booking?.observaciones}>
                    <span>{booking?.observaciones ?? ""}</span>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell align="right">
                <Grid container gap={1}>
                  <Button
                    onClick={() => openConfirm(booking, "accept")}
                    variant="contained"
                    size="small"
                  >
                    Aceptar
                  </Button>
                  <Button
                    onClick={() => openConfirm(booking, "reject")}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Rechazar
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmActionModal
        open={!!actionType}
        action={actionType ?? "accept"}
        elementName={`${selectedBooking?.cliente?.nombre ?? ""} ${selectedBooking?.cliente?.apellido_1}`}
        onCancel={closeConfirm}
        onConfirm={handleConfirm}
      />
    </TableContainer>
  );
}
