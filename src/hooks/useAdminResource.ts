import { useState } from "react";

export function useAdminResource<T>(items: T[] = []) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
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

  const isModalOpen = isCreating || selectedItem !== null;

  return {
    items,
    selectedItem,
    isCreating,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
  };
}
