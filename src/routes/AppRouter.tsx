import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../auth/RequireAuth";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Layout from "../components/Layout/Layout";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
