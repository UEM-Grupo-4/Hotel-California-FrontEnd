import dayjs from "dayjs";
import type { RoomFiltersUI } from "../types/rooms";

export const mapFiltersToParams = (filters: RoomFiltersUI) => {
  if (filters.type === "event") {
    return {
      type: filters.type,
      start: dayjs(filters.eventStart).format("YYYY-MM-DD"),
      startFrom: dayjs(filters.eventStart).format("HH:mm"),
      durationHours: filters.durationHours,
      people: filters.people,
    };
  }

  return {
    startDate: dayjs(filters.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(filters.endDate).format("YYYY-MM-DD"),
    people: filters.people,
    type: filters.type,
  };
};
