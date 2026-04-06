import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../auth/RequireAuth";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Layout from "../components/Layout/Layout";
import Contact from "../pages/Contact/Contact";
import MyBooking from "../pages/MyBooking/MyBooking";
import Reservation from "../pages/Reservation/Reservation";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mi-reserva" element={<MyBooking />} />
        <Route path="/contacto" element={<Contact />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<h6>404 Not found</h6>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
