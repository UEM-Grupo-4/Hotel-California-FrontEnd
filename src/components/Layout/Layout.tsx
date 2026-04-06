import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <Grid container flexDirection="column" width="100%" height={"100vh"} wrap="nowrap">
      <NavBar />
      <Outlet />
    </Grid>
  );
};

export default Layout;
