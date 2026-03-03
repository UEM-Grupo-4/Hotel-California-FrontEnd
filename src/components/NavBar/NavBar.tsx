import { Grid, styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAVBAR_BUTTONS = [
  {
    displayName: "Buscar",
    url: "/",
  },
  {
    displayName: "Mi Reserva",
    url: "/mi-reserva",
  },
  {
    displayName: "Login",
    url: "/login",
  },
  {
    displayName: "Contacto",
    url: "/contacto",
  },
];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const onClickTab = (_: React.SyntheticEvent, url: string) => {
    setSelectedTab(url);
    navigate(url);
  };

  return (
    <Grid container gap={3} size="auto">
      <Tabs value={selectedTab} textColor="inherit" indicatorColor="primary" onChange={onClickTab}>
        {NAVBAR_BUTTONS.map(({ displayName, url }, index) => {
          return <NavTab key={index} label={displayName} value={url} />;
        })}
      </Tabs>
    </Grid>
  );
}

const NavTab = styled(Tab)({
  color: "black",
  textTransform: "capitalize",
});

export default NavBar;
