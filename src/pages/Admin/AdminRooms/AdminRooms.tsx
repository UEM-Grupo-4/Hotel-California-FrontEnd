import { isEmpty } from "lodash";
import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { RoomCreateModal } from "../../../components/RoomModal/RoomModal";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";
import { useAdminResource } from "../../../hooks/useAdminResource";
import { useRooms } from "../../../api/rooms";

function AdminRooms() {
  const { data: rooms = [] } = useRooms();
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();

  const {
    items: roomsList,
    selectedItem: selectedRoom,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
  } = useAdminResource(rooms);

  return (
    <>
      <AdminSection title="Rooms" onCreate={openCreate} isEmpty={isEmpty(rooms)}>
        <Grid container spacing={2}>
          {roomsList?.map((room) => (
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
