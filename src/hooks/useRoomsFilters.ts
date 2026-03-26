import { useState } from "react";
import type { RoomFiltersUI } from "../types/rooms";

const INITIAL_VALUE = {
  startDate: undefined,
  endDate: undefined,
  type: "",
  people: 1,
};

export const useRoomsFilters = () => {
  const [roomsFilters, setRoomsFilters] = useState<RoomFiltersUI>(INITIAL_VALUE);

  const onChangeFilters = <K extends keyof RoomFiltersUI>(name: K, value: RoomFiltersUI[K]) => {
    setRoomsFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    roomsFilters,
    onChangeFilters,
  };
};
