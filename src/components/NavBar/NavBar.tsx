import { Box, Button, Grid, styled, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCaliforniaLogo from "../../assets/favicon.png";
import { useAuth } from "../../hooks/useAuth";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { NAVBAR_BUTTONS } from "../../mocks/dataMock";
import AccountMenu from "../NavBarLoginMenu/NavBarLoginMenu";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged } = useAuth();
  const [selectedTab, setSelectedTab] = useState(location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname != selectedTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedTab(location.pathname);
    }
  }, [location.pathname, setSelectedTab, selectedTab]);

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
    <Header $isScrolled={isScrolled || isLogged || location.pathname === "/chat"}>
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
          value={ALL_TABS.some((tab) => tab.url === selectedTab) ? selectedTab : false}
          textColor="inherit"
          indicatorColor="primary"
          onChange={onClickTab}
        >
          {ALL_TABS.map(({ displayName, url }, index) => {
            return <NavTab key={index} label={displayName} value={url} />;
          })}
        </Tabs>
      </Grid>
      <Grid container gap={1} size="auto" alignItems={"center"}>
        <Button
          variant="contained"
          startIcon={<CalendarMonthIcon />}
          onClick={(event) => onClickTab(event, "/reservation")}
          size="small"
          sx={{ height: 40 }}
        >
          Reservar
        </Button>
        <AccountMenu onClickTab={onClickTab} />
      </Grid>
    </Header>
  );
}

const Header = styled("header")<{ $isScrolled: boolean }>(({ $isScrolled }) => ({
  position: "fixed",
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  zIndex: 100,
  paddingTop: 8,

  backgroundColor: $isScrolled ? "rgba(0,0,0,0.8)" : "transparent",
  boxShadow: $isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
  borderBottom: $isScrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
  transitionDuration: ".3s",
  opacity: $isScrolled ? 1 : 0.6,
}));

const NavTab = styled(Tab)({
  color: "white",
  fontSize: 18,
  fontWeight: 600,
  textTransform: "none",
});

export default NavBar;
