import { Box } from "@mui/material";
import FiltersTitle from "./FiltersTitle";

interface Props {
  collapsed: boolean;
}

function FiltersTitleWrapper({ collapsed }: Readonly<Props>) {
  return (
    <Box
      sx={{
        transition: "all 0.5s ease",
        display: collapsed ? "none" : "block",
        transform: collapsed ? "translateY(-20px)" : "translateY(0)",
        pointerEvents: collapsed ? "none" : "auto",
      }}
    >
      <FiltersTitle />
    </Box>
  );
}

export default FiltersTitleWrapper;
