import { Box, Grid, styled, Tab, Tabs, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCaliforniaLogo from "../../assets/favicon.png";
import { useAuth } from "../../hooks/useAuth";

const NAVBAR_BUTTONS = [
  {
    displayName: "Home",
    url: "/",
  },
  {
    displayName: "Reservar",
    url: "/reservation",
  },
  {
    displayName: "Mi reserva",
    url: "/mi-reserva",
  },
  {
    displayName: "Contacto",
    url: "/contacto",
  },
];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged } = useAuth();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  const onClickTab = (_: React.SyntheticEvent, url: string) => {
    setSelectedTab(url);
    navigate(url);
  };

  const ALL_TABS = useMemo(() => {
    if (isLogged) {
      return [...NAVBAR_BUTTONS, { displayName: "Admin", url: "/admin" }];
    }

    return NAVBAR_BUTTONS;
  }, [isLogged]);

  return (
    <Header>
      <Grid
        container
        size="auto"
        alignItems={"center"}
        gap={1}
        onClick={(event) => onClickTab(event, "/")}
        sx={{ cursor: "pointer" }}
      >
        <Box
          component={"img"}
          src={HotelCaliforniaLogo}
          alt="Hotel California logo"
          sx={{ width: 35, height: 35 }}
        />
        <Typography variant="h1" fontSize={30} color="white">
          Hotel California
        </Typography>
      </Grid>
      <Grid container gap={3} size="auto">
        <Tabs
          value={selectedTab}
          textColor="inherit"
          indicatorColor="primary"
          onChange={onClickTab}
        >
          {ALL_TABS.map(({ displayName, url }, index) => {
            return <NavTab key={index} label={displayName} value={url} />;
          })}
        </Tabs>
      </Grid>
    </Header>
  );
}

const Header = styled("header")({
  position: "fixed",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  zIndex: 100,
  paddingTop: 8,
});

const NavTab = styled(Tab)({
  color: "white",
  fontSize: 18,
  fontWeight: 600,
  textTransform: "none",
});

export default NavBar;
