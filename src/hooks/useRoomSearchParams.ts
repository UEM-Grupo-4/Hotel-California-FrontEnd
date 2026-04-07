import { useSearchParams } from "react-router-dom";

export const useRoomSearchParams = () => {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const people = searchParams.get("people");
  const type = searchParams.get("type");

  const hasFilters = !!startDate && !!endDate && !!people;

  return {
    startDate,
    endDate,
    people: people ? Number(people) : null,
    type,
    hasFilters,
  };
};
