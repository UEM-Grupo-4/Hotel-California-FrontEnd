import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useBookings } from "../../../api/rooms.hooks";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";

const formatDate = (date?: string) => {
  if (!date) return undefined;

  return dayjs(date).format("DD/MM/YYYY");
};

export default function AdminBookings() {
  const { data } = useBookings();

  if (!data) return <h5>No hay reservas para revisar</h5>;

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
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((booking) => (
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
                <Tooltip title={booking?.observaciones}>
                  <span>{booking?.observaciones ?? ""}</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
