import { isEmpty } from "lodash";
import { useAdminRoomsTypes } from "../../../hooks/useAdminRoomsType";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomTypeCard } from "../../../components/RoomTypeCard/RoomTypeCard";
import { RoomTypeCreateModal } from "../../../components/RoomTypeModal/RoomTypeModal";
import { Grid } from "@mui/material";

function AdminRoomsType() {
  const { roomsTypes, selectedRoomType, isModalOpen, openCreate, openEdit, closeModal } =
    useAdminRoomsTypes();

  return (
    <>
      <AdminSection title="Room Types" onCreate={openCreate} isEmpty={isEmpty(roomsTypes)}>
        <Grid container spacing={2}>
          {roomsTypes?.map((type) => (
            <Grid size={6} key={type.id}>
              <RoomTypeCard key={type.id} roomType={type} onEdit={openEdit} />
            </Grid>
          ))}
        </Grid>
      </AdminSection>
      {isModalOpen && (
        <RoomTypeCreateModal open={isModalOpen} onClose={closeModal} roomType={selectedRoomType} />
      )}
    </>
  );
}

export default AdminRoomsType;
