import { isEmpty } from "lodash";
import { useAdminRoomsType } from "../../../hooks/useAdminRoomsType";
import { AdminSection } from "../AdminSection/AdminSection";
import { RoomTypeCard } from "../../../components/RoomTypeCard/RoomTypeCard";
import { RoomTypeCreateModal } from "../../../components/RoomTypeModal/RoomTypeModal";

function AdminRoomsType() {
  const { roomsTypes } = useAdminRoomsType();

  return (
    <AdminSection title="Room Types" onCreate={startCreateRoomType} isEmpty={isEmpty(roomsTypes)}>
      {roomsTypes?.map((type) => (
        <RoomTypeCard key={type.id} roomType={type} />
      ))}

      <RoomTypeCreateModal
        open={isRoomTypeModalOpen}
        onClose={closeRoomTypeModal}
        amenities={amenities ?? []}
        onCreate={(data) => console.log("create room type", data)}
      />
    </AdminSection>
  );
}

export default AdminRoomsType;
