import { isEmpty } from "lodash";
import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomCard } from "../../../components/RoomCard/RoomCard";
import { RoomCreateModal } from "../../../components/RoomModal/RoomModal";
import { useMapAmenitiesOnRoomType } from "../../../hooks/useMapAmenitiesOnRoomType";
import { useAdminResource } from "../../../hooks/useAdminResource";
import { useDeleteRoom, useRooms } from "../../../api/rooms.hooks";
import { DeleteConfirmModal } from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";

function AdminRooms() {
  const { data: rooms = [] } = useRooms();
  const { mapAmenitiesOnRoomType } = useMapAmenitiesOnRoomType();
  const deleteRoomMutation = useDeleteRoom();

  const {
    items: roomsList,
    selectedItem: selectedRoom,
    isModalOpen,
    isDeleteOpen,
    itemToDelete,
    openCreate,
    openEdit,
    openDelete,
    closeDelete,
    closeModal,
  } = useAdminResource(rooms);

  const handleDelete = () => {
    if (!itemToDelete) return;

    deleteRoomMutation.mutate(itemToDelete.id, {
      onSuccess: () => {
        closeDelete();
      },
    });
  };

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
                onDelete={openDelete}
              />
            </Grid>
          ))}
        </Grid>
      </AdminSection>

      {isModalOpen && (
        <RoomCreateModal open={isModalOpen} onClose={closeModal} room={selectedRoom} />
      )}

      <DeleteConfirmModal
        open={isDeleteOpen}
        elementName={itemToDelete?.number}
        onCancel={closeDelete}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default AdminRooms;
