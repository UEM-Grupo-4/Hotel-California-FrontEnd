import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { mapFiltersToParams } from "../utils/dates";

export type RoomFiltersUI = {
  type: "room" | "event";
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  people: number;

  eventStart: Dayjs | null;
  durationHours: number;
};

export const useRoomsFilters = () => {
  const [searchParams] = useSearchParams();

  const initialState: RoomFiltersUI = {
    type: (searchParams.get("type") as "room" | "event") ?? "room",
    startDate: searchParams.get("startDate") ? dayjs(searchParams.get("startDate")) : null,
    endDate: searchParams.get("endDate") ? dayjs(searchParams.get("endDate")) : null,
    people: searchParams.get("people") ? Number(searchParams.get("people")) : 1,

    eventStart: null,
    durationHours: 1,
  };

  const [roomsFilters, setRoomsFilters] = useState<RoomFiltersUI>(initialState);

  const onChangeFilters = <K extends keyof RoomFiltersUI>(name: K, value: RoomFiltersUI[K]) => {
    setRoomsFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeType = (type: "room" | "event") => {
    setRoomsFilters((prev) => ({
      ...prev,
      type,
      startDate: type === "room" ? prev.startDate : null,
      endDate: type === "room" ? prev.endDate : null,
      eventStart: type === "event" ? prev.eventStart : null,
      durationHours: type === "event" ? prev.durationHours : 1,
    }));
  };

  const isInvalidDateRange = useMemo(() => {
    if (!roomsFilters.startDate || !roomsFilters.endDate) return false;

    return roomsFilters.endDate.isBefore(roomsFilters.startDate);
  }, [roomsFilters.startDate, roomsFilters.endDate]);

  const isSearchDisabled = useMemo(() => {
    if (roomsFilters.type === "room") {
      return (
        !roomsFilters.startDate ||
        !roomsFilters.endDate ||
        !roomsFilters.people ||
        isInvalidDateRange
      );
    }

    return !roomsFilters.eventStart || !roomsFilters.durationHours || !roomsFilters.people;
  }, [roomsFilters, isInvalidDateRange]);

  const getQueryParams = () => {
    return mapFiltersToParams(roomsFilters);
  };

  return {
    roomsFilters,
    onChangeFilters,
    onChangeType,
    isSearchDisabled,
    getQueryParams,
  };
};
