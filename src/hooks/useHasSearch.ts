import { useLocation } from "react-router-dom";

export function useHasSearch() {
  const { search } = useLocation();

  return Boolean(search);
}
