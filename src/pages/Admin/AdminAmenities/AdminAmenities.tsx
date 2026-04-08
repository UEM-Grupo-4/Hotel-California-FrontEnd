import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { AmenityCard } from "../../../components/RoomAmenityCard/RoomAmenityCard";
import { AmenityModal } from "../../../components/RoomAmenitiesModal/RoomAmenitiesModal";

import { useAdminResource } from "../../../hooks/useAdminResource";
import { useRoomsAmenities, useDeleteAmenity } from "../../../api/rooms.hooks";
import { DeleteConfirmModal } from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";

function AdminAmenities() {
  const { data: amenities = [] } = useRoomsAmenities();
  const deleteAmenityMutation = useDeleteAmenity();

  const {
    items: amenitiesList,
    selectedItem: selectedAmenity,
    itemToDelete,
    isModalOpen,
    isDeleteOpen,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    closeDelete,
  } = useAdminResource(amenities);

  const handleDelete = () => {
    if (!itemToDelete) return;

    deleteAmenityMutation.mutate(itemToDelete.id, {
      onSuccess: () => {
        closeDelete();
      },
    });
  };

  return (
    <>
      <AdminSection title="Amenities" onCreate={openCreate}>
        <Grid container spacing={2}>
          {amenitiesList.map((amenity) => (
            <Grid size={{ xs: 6, md: 4 }} key={amenity.id}>
              <AmenityCard amenity={amenity} onEdit={openEdit} onDelete={openDelete} />
            </Grid>
          ))}
        </Grid>
      </AdminSection>

      {isModalOpen && (
        <AmenityModal open={isModalOpen} amenity={selectedAmenity} onClose={closeModal} />
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

export default AdminAmenities;
