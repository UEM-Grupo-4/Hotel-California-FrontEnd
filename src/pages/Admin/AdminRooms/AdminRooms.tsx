import { isEmpty } from "lodash";
import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { RoomCreateModal } from "../../../components/RoomModal/RoomModal";
import { useAdminRooms } from "../../../hooks/useAdminRooms";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";

function AdminRooms() {
  const { rooms, selectedRoom, isModalOpen, openCreate, openEdit, closeModal } = useAdminRooms();
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();

  return (
    <>
      <AdminSection title="Rooms" onCreate={openCreate} isEmpty={isEmpty(rooms)}>
        <Grid container spacing={2}>
          {rooms?.map((room) => (
            <Grid size={12} key={room.id}>
              <RoomCard
                room={room}
                onEdit={openEdit}
                mapAmenitiesOnRoomType={mapAmenitiesOnRoomType}
              />
            </Grid>
          ))}
        </Grid>
      </AdminSection>

      {isModalOpen && (
        <RoomCreateModal open={isModalOpen} onClose={closeModal} room={selectedRoom} />
      )}
    </>
  );
}

export default AdminRooms;
