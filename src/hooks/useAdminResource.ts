import { useState } from "react";

export function useAdminResource<T>(items: T[] = []) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  const openCreate = () => {
    setSelectedItem(null);
    setIsCreating(true);
  };

  const openEdit = (item: T) => {
    setSelectedItem(item);
    setIsCreating(false);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsCreating(false);
  };

  // DELETE
  const openDelete = (item: T) => {
    setItemToDelete(item);
  };

  const closeDelete = () => {
    setItemToDelete(null);
  };

  const isModalOpen = isCreating || selectedItem !== null;
  const isDeleteOpen = itemToDelete !== null;

  return {
    items,
    selectedItem,
    itemToDelete,
    isCreating,
    isModalOpen,
    isDeleteOpen,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    closeDelete,
  };
}
