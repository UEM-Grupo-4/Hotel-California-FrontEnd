import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { AmenityCard } from "../../../components/RoomAmenityCard/RoomAmenityCard";
import { AmenityModal } from "../../../components/RoomAmenitiesModal/RoomAmenitiesModal";
import { useAdminResource } from "../../../hooks/useAdminResource";
import { useRoomsAmenities } from "../../../api/rooms";

function AdminAmenities() {
  const { data: amenities = [] } = useRoomsAmenities();

  const {
    items: amenitiesList,
    selectedItem: selectedAmenity,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
  } = useAdminResource(amenities);

  return (
    <>
      <AdminSection title="Amenities" onCreate={openCreate}>
        <Grid container spacing={2}>
          {amenitiesList.map((amenity) => (
            <Grid size={{ xs: 6, md: 4 }} key={amenity.id}>
              <AmenityCard amenity={amenity} onEdit={openEdit} />
            </Grid>
          ))}
        </Grid>
      </AdminSection>

      {isModalOpen && (
        <AmenityModal open={isModalOpen} amenity={selectedAmenity} onClose={closeModal} />
      )}
    </>
  );
}

export default AdminAmenities;
