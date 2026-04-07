import { useState } from "react";

export const useAdminTabs = () => {
  const [tabSelected, setTabSelected] = useState("rooms");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
  };

  return {
    tabSelected,
    handleTabChange,
  };
};
