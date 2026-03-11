import type { PickerValue } from "@mui/x-date-pickers/internals";
import { useState } from "react";

const INITIAL_VALUE = {
  startDate: undefined,
  endDate: undefined,
  type: "",
  people: 1,
};

type FiltersType = {
  startDate?: PickerValue;
  endDate?: PickerValue;
  type?: string;
  people: number;
};

export const useRoomsFilters = () => {
  const [roomsFilters, setRoomsFilters] = useState<FiltersType>(INITIAL_VALUE);

  const onChangeFilters = <K extends keyof FiltersType>(name: K, value: FiltersType[K]) => {
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
