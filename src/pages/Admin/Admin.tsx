import { Container } from "@mui/material";
import AdminAmenities from "./AdminAmenities/AdminAmenities";
import AdminRoomsType from "./AdminRoomsType/AdminRoomsType";
import AdminRooms from "./AdminRooms/AdminRooms";

const Admin = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, gap: 2 }}>
      <AdminRooms />
      <AdminRoomsType />
      <AdminAmenities />
    </Container>
  );
};

export default Admin;
