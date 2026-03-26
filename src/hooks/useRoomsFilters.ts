import { useState } from "react";
import type { RoomFiltersUI } from "../types/rooms";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export const useRoomsFilters = () => {
  const [searchParams] = useSearchParams();

  const initialState: RoomFiltersUI = {
    startDate: searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : undefined,
    endDate: searchParams.get("endDate") ? dayjs(searchParams.get("endDate")) : undefined,
    people: searchParams.get("people") ? Number(searchParams.get("people")) : 1,
  };

  const [roomsFilters, setRoomsFilters] = useState<RoomFiltersUI>(initialState);

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
