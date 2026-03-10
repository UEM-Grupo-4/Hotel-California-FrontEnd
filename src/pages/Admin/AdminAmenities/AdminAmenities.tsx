import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { AmenityCard } from "../../../components/RoomAmenityCard/RoomAmenityCard";
import { AmenityModal } from "../../../components/RoomAmenitiesModal/RoomAmenitiesModal";
import { useAdminAmenities } from "../../../hooks/useAdminAmenities";

function AdminAmenities() {
  const { amenities, selectedAmenity, isModalOpen, openCreate, openEdit, closeModal } =
    useAdminAmenities();

  return (
    <>
      <AdminSection title="Amenities" onCreate={openCreate}>
        <Grid container spacing={2}>
          {amenities.map((amenity) => (
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
