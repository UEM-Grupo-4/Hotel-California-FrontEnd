import { useSearchParams } from "react-router-dom";

export const useEventSearchParams = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start");
  const startFrom = searchParams.get("startFrom");
  const durationHours = searchParams.get("durationHours");
  const people = searchParams.get("people");
  const type = searchParams.get("type");

  const hasFilters = !!startDate && !!startFrom && !!durationHours && !!people;

  return {
    startDate,
    startFrom,
    durationHours,
    people: people ? Number(people) : null,
    type,
    hasFilters,
  };
};
