import { useSearchParams } from "react-router-dom";

export const useBookingSearchParams = () => {
  const [searchParams] = useSearchParams();

  return {
    code: searchParams.get("code") || "",
  };
};
