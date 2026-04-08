import { isEmpty } from "lodash";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomTypeCard } from "../../../components/RoomTypeCard/RoomTypeCard";
import { RoomTypeCreateModal } from "../../../components/RoomTypeModal/RoomTypeModal";
import { Grid } from "@mui/material";
import { useAdminResource } from "../../../hooks/useAdminResource";
import { useDeleteRoomType, useRoomsTypes } from "../../../api/rooms.hooks";
import { DeleteConfirmModal } from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";

function AdminRoomsType() {
  const { data: roomsTypes = [] } = useRoomsTypes();
  const deleteRoomTypeMutation = useDeleteRoomType();

  const {
    items: roomsTypesList,
    selectedItem: selectedRoomType,
    isModalOpen,
    isDeleteOpen,
    itemToDelete,
    closeDelete,
    openDelete,
    openCreate,
    openEdit,
    closeModal,
  } = useAdminResource(roomsTypes);

  const handleDelete = () => {
    if (!itemToDelete) return;

    deleteRoomTypeMutation.mutate(itemToDelete.id, {
      onSuccess: () => {
        closeDelete();
      },
    });
  };

  return (
    <>
      <AdminSection title="Room Types" onCreate={openCreate} isEmpty={isEmpty(roomsTypes)}>
        <Grid container spacing={2}>
          {roomsTypesList?.map((type) => (
            <Grid size={6} key={type.id}>
              <RoomTypeCard
                key={type.id}
                roomType={type}
                onEdit={openEdit}
                openDelete={openDelete}
              />
            </Grid>
          ))}
        </Grid>
      </AdminSection>
      {isModalOpen && (
        <RoomTypeCreateModal open={isModalOpen} onClose={closeModal} roomType={selectedRoomType} />
      )}

      <DeleteConfirmModal
        open={isDeleteOpen}
        elementName={itemToDelete?.name}
        onCancel={closeDelete}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default AdminRoomsType;
