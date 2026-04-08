import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  value: string;
  tabSelected: string;
}

export function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, tabSelected, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabSelected !== value}
      id={`full-width-tabpanel-${value}`}
      aria-labelledby={`full-width-tab-${value}`}
      {...other}
    >
      {tabSelected === value && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
