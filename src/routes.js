import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";
import { Compress, Engineering } from "@mui/icons-material";
import LatheMachineTables from "layouts/tables/latheMachine";
import HeatingBoilersTables from "layouts/tables/heatingBoilers";
import LiftingCraneTables from "layouts/tables/liftingCrane";
import PressureVesselTables from "layouts/tables/pressureVessel";
import WeldingEquipmentTables from "layouts/tables/weldingEquipment";
import MaintenanceScheduleTables from "./layouts/tables/maintenanceSchedule";
import ProtectedRoute from "ProtectedRoute";
const userRole = localStorage.getItem("userRole"); // Get current user's role

const routes = [
 ...(userRole === "Superuser" ? [{
    type: "collapse",
    name: "Boshqaruv paneli",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <ProtectedRoute requiredRole="Superuser"><Dashboard /></ProtectedRoute>,
    noCollapse: true,
  }] : []),
  {
    type: "collapse",
    name: "Isitish qozonlari",
    key: "isitish-qozonlari",
    route: "/isitish-qozonlari",
    icon: <Cube size="12px" />,
    component: <ProtectedRoute><HeatingBoilersTables /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tokarlik dastgohlari",
    key: "tokarlik-dastgohlari",
    route: "/tokarlik-dastgohlari",
    icon: <Settings size="12px" />,
    component: <ProtectedRoute><LatheMachineTables /></ProtectedRoute>,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Yuk ko'tarish kranlari",
    key: "yuk-ko'tarish-kranlari",
    route: "/yuk-ko'tarish-kranlari",
    icon: <Office size="12px" />,
    component: <ProtectedRoute><LiftingCraneTables /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Bosim ostida sig'imlar",
    key: "bosim-ostida-sig'imlar",
    route: "/bosim-ostida-sig'imlar",
    // not SpaceShip.please write suitable icon
    icon: <Compress size="12px" />,
    component: <ProtectedRoute><PressureVesselTables /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Payvandlash qurilmalari",
    key: "payvandlash-qurilmalari",
    route: "/payvandlash-qurilmalari",
    icon: <Engineering size="12px" />,
    component: <ProtectedRoute><WeldingEquipmentTables /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ta'mirlash jadvali",
    key: "ta'mirlash-jadvali",
    route: "/ta'mirlash-jadvali",
    icon: <Document size="12px" />, // 📄 Good for schedule/data
    component: <ProtectedRoute><MaintenanceScheduleTables /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ogohlantirishlar",
    key: "ogohlantirishlar",
    route: "/ogohlantirishlar",
    icon: <CustomerSupport size="12px" />, // 🚨 Not perfect but OK
    component: <ProtectedRoute><Billing /></ProtectedRoute>,
    noCollapse: true,
  },

  { type: "title", title: "Foydalanuvchi sahifalari", key: "account-pages" },
  {
    type: "collapse",
    name: "Kabinet",
    key: "kabinet",
    route: "/kabinet",
    icon: <CustomerSupport size="12px" />,
    component: <ProtectedRoute><Profile /></ProtectedRoute>,
    noCollapse: true,
  },

  {
    type: "hidden",
    name: "Kirish",
    key: "kirish",
    route: "/kirish",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
