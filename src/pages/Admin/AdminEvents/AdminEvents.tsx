import { Grid } from "@mui/material";
import { AdminSection } from "../AdminSection/AdminSection";
import { EventCard } from "../../Reservation/EventDetails/EventCard";
import { useDeleteEvent, useEvents } from "../../../api/rooms.hooks";
import { isEmpty } from "lodash";
import { EventCreateModal } from "../../../components/EventCreateModal/EventCreateModal";
import { useAdminResource } from "../../../hooks/useAdminResource";
import { DeleteConfirmModal } from "../../../components/DeleteConfirmationModal/DeleteConfirmationModal";

function AdminEvents() {
  const { data: eventsList = [] } = useEvents();
  const deleteRoomMutation = useDeleteEvent();

  const {
    items: events,
    selectedItem: selectedEvent,
    isModalOpen,
    isDeleteOpen,
    itemToDelete,
    openCreate,
    openEdit,
    openDelete,
    closeDelete,
    closeModal,
  } = useAdminResource(eventsList);

  const handleDelete = () => {
    if (!itemToDelete?.id) return;

    deleteRoomMutation.mutate(itemToDelete.id, {
      onSuccess: () => {
        closeDelete();
      },
    });
  };

  return (
    <>
      <AdminSection title="Eventos" onCreate={openCreate} isEmpty={isEmpty(eventsList)}>
        <Grid container spacing={2}>
          {events?.map((event) => (
            <Grid size={12} key={event.id}>
              <EventCard event={event} onEdit={openEdit} onDelete={openDelete} />
            </Grid>
          ))}
        </Grid>
      </AdminSection>
      {isModalOpen && (
        <EventCreateModal open={isModalOpen} onClose={closeModal} event={selectedEvent} />
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

export default AdminEvents;
