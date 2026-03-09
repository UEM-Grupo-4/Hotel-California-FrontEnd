import { Container, Grid } from "@mui/material";
import { RoomCard } from "../../components/RoomCard/RoomCard";
import { AmenityCreateModal } from "../../components/RoomAmenitiesModal/RoomAmenitiesModal";
import { RoomTypeCreateModal } from "../../components/RoomTypeModal/RoomTypeModal";
import { AdminSection } from "./AdminSection/AdminSection";
import { useAdmin } from "../../hooks/useAdmin";
import { RoomModal } from "../../components/RoomModal/RoomModal";
import { RoomTypeCard } from "../../components/RoomTypeCard/RoomTypeCard";
import { AmenityCard } from "../../components/RoomAmenityCard/RoomAmenityCard";
import { isEmpty } from "lodash";

const Admin = () => {
  const {
    rooms,
    roomsTypes,
    amenities,
    selectedRoomId,
    isAmenityModalOpen,
    isRoomModalOpen,
    isRoomTypeModalOpen,
    closeRoomModal,
    closeRoomTypeModal,
    closeAmenityModal,
    openRoomModal,
    startCreateRoom,
    startCreateRoomType,
    startCreateAmenity,
  } = useAdmin();

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Grid container gap={2} flexDirection={"column"}>
        <AdminSection
          title="Habitaciones"
          createLabel="Nueva habitación"
          onCreate={startCreateRoom}
          isEmpty={isEmpty(rooms)}
        >
          {rooms?.map((room) => (
            <RoomCard key={room.id} room={room} onViewDetails={() => openRoomModal(room.id)} />
          ))}
        </AdminSection>

        <AdminSection
          title="Room Types"
          onCreate={startCreateRoomType}
          isEmpty={isEmpty(roomsTypes)}
        >
          {roomsTypes.map((type) => (
            <RoomTypeCard key={type.id} roomType={type} />
          ))}
        </AdminSection>

        <AdminSection title="Amenities" onCreate={startCreateAmenity} isEmpty={isEmpty(amenities)}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {amenities.map((amenity) => (
              <Grid sx={{ xs: 6, md: 3 }} key={amenity.id}>
                <AmenityCard amenity={amenity} />
              </Grid>
            ))}
          </Grid>
        </AdminSection>
      </Grid>

      {selectedRoomId && (
        <RoomModal roomId={selectedRoomId} open={isRoomModalOpen} onClose={closeRoomModal} />
      )}

      <AmenityCreateModal
        open={isAmenityModalOpen}
        onClose={closeAmenityModal}
        onCreate={(name) => console.log("create amenity", name)}
      />

      <RoomTypeCreateModal
        open={isRoomTypeModalOpen}
        onClose={closeRoomTypeModal}
        amenities={amenities ?? []}
        onCreate={(data) => console.log("create room type", data)}
      />
    </Container>
  );
};

export default Admin;
