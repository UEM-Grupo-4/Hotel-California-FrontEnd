import { Box, Container, Tab, Tabs } from "@mui/material";
import { useAdminTabs } from "../../hooks/useAdminTabs";
import { TabPanel } from "../../components/TabPanel/TabPanel";
import { lazy } from "react";

const AdminRooms = lazy(() => import("./AdminRooms/AdminRooms"));
const AdminAmenities = lazy(() => import("./AdminAmenities/AdminAmenities"));
const AdminRoomsType = lazy(() => import("./AdminRoomsType/AdminRoomsType"));
const AdminBookings = lazy(() => import("./AdminBookings/AdminBookings"));
const AdminChats = lazy(() => import("./AdminChats/AdminChats"));
const AdminEvents = lazy(() => import("./AdminEvents/AdminEvents"));

const Admin = () => {
  const { handleTabChange, tabSelected } = useAdminTabs();

  return (
    <Container maxWidth="xl" sx={{ py: 2, gap: 2 }}>
      <Box sx={{ width: "100%", typography: "body1", marginTop: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabSelected} onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Rooms" value="rooms" />
            <Tab label="Rooms Types" value="rooms-types" />
            <Tab label="Amenities" value="amenities" />
            <Tab label="Salones" value="events" />
            <Tab label="Reservas" value="bookings" />
            <Tab label="Chats" value="chats" />
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
        <TabPanel value={"events"} tabSelected={tabSelected}>
          <AdminEvents />
        </TabPanel>
        <TabPanel value={"bookings"} tabSelected={tabSelected}>
          <AdminBookings />
        </TabPanel>
        <TabPanel value={"chats"} tabSelected={tabSelected}>
          <AdminChats />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Admin;
