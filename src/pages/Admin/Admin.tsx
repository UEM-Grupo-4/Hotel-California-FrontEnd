import { Container } from "@mui/material";
import { AdminAmenities } from "./AdminAmenities/AdminAmenities";

const Admin = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <AdminAmenities />
    </Container>
  );
};

export default Admin;
