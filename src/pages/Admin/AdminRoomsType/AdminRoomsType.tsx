import { isEmpty } from "lodash";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomTypeCard } from "../../../components/RoomTypeCard/RoomTypeCard";
import { RoomTypeCreateModal } from "../../../components/RoomTypeModal/RoomTypeModal";
import { Grid } from "@mui/material";
import { useRoomsTypes } from "../../../api/rooms";
import { useAdminResource } from "../../../hooks/useAdminResource";

function AdminRoomsType() {
  const { data: roomsTypes = [] } = useRoomsTypes();

  const {
    items: roomsTypesList,
    selectedItem: selectedRoomType,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
  } = useAdminResource(roomsTypes);

  return (
    <>
      <AdminSection title="Room Types" onCreate={openCreate} isEmpty={isEmpty(roomsTypes)}>
        <Grid container spacing={2}>
          {roomsTypesList?.map((type) => (
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
