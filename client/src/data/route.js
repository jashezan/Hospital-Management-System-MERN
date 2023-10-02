import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Appointments from "../pages/Appointments";
import DoctorProfile from "../pages/DoctorProfile";
import FutureAppointment from "../pages/FutureAppointment";


const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Register,
  },
  {
    path: "/appointment",
    component: Appointments,
  },
  {
    path: "/doctor/appointments",
    component: FutureAppointment,
  },
  {
    path: "/doctor",
    component: DoctorProfile,
  },
];

export default routes;
