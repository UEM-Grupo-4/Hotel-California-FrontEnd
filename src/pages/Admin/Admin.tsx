import { Container } from "@mui/material";
import AdminAmenities from "./AdminAmenities/AdminAmenities";
import AdminRoomsType from "./AdminRoomsType/AdminRoomsType";

const Admin = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2, gap: 2 }}>
      <AdminRoomsType />
      <AdminAmenities />
    </Container>
  );
};

export default Admin;
