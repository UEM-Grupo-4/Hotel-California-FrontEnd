import { Box, Container, Tab, Tabs } from "@mui/material";
import AdminAmenities from "./AdminAmenities/AdminAmenities";
import AdminRoomsType from "./AdminRoomsType/AdminRoomsType";
import AdminRooms from "./AdminRooms/AdminRooms";
import { useAdminTabs } from "../../hooks/useAdminTabs";
import { TabPanel } from "../../components/TabPanel/TabPanel";

const Admin = () => {
  const { handleTabChange, tabSelected } = useAdminTabs();

  return (
    <Container maxWidth="md" sx={{ py: 2, gap: 2 }}>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabSelected} onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Rooms" value="rooms" />
            <Tab label="Rooms Types" value="rooms-types" />
            <Tab label="Amenities" value="amenities" />
          </Tabs>
        </Box>
        <TabPanel value={"rooms"} tabSelected={tabSelected}>
          <AdminRooms />
        </TabPanel>
        <TabPanel value={"rooms-types"} tabSelected={tabSelected}>
          <AdminRoomsType />
        </TabPanel>
        <TabPanel value={"amenities"} tabSelected={tabSelected}>
          <AdminAmenities />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Admin;
