import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../auth/RequireAuth";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Layout from "../components/Layout/Layout";
import Contact from "../pages/Contact/Contact";
import Booking from "../pages/Booking/Booking";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/mi-reserva" element={<Booking />} />
        <Route path="/contacto" element={<Contact />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
