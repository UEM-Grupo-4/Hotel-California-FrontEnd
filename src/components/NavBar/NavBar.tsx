import { Box, Grid, styled, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCaliforniaLogo from "../../assets/favicon.png";

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
    <Grid container justifyContent={"space-between"} alignItems={"center"}>
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
        <Typography variant="h1" fontSize={24}>
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
          {NAVBAR_BUTTONS.map(({ displayName, url }, index) => {
            return <NavTab key={index} label={displayName} value={url} />;
          })}
        </Tabs>
      </Grid>
    </Grid>
  );
}

const NavTab = styled(Tab)({
  color: "black",
  textTransform: "capitalize",
});

export default NavBar;
