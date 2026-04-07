import PoolIcon from "@mui/icons-material/Pool";
import WifiIcon from "@mui/icons-material/Wifi";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SpaIcon from "@mui/icons-material/Spa";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export const EMPTY_ROOM = {
  id: undefined,
  name: "",
  price: 0,
  squareMeters: 50,
  maxGuests: 1,
  bedType: "",
  sight: "",
  image: "",
};

export const EMPTY_ROOM_TYPE = {
  id: undefined,
  name: "",
  capacity: 1,
  price_per_night: 0,
  amenities: [],
};

export const EMPTY_AMENITY = {
  id: undefined,
  name: "",
};

export const commonAmenities = [
  {
    name: "Wifi alta velocidad",
    description: "Disfrutá de internet de máxima velocidad en todo el hotel",
    icon: WifiIcon,
  },
  {
    name: "Aparcamiento libre",
    description: "Amplio y seguro espacio de parking para nuestros huéspedes",
    icon: ElectricCarIcon,
  },
  {
    name: "Restaurant & Bar",
    description: "Platos gourmet y cocktails elegantes en nuestro bar",
    icon: LocalBarIcon,
  },
  {
    name: "Centro de Spa",
    description: "Sumergite en nuestro centro de relajación y tratamientos de rejuvenecimiento",
    icon: SpaIcon,
  },
  {
    name: "Gimnasio",
    description: "Mantenete activo en nuestra area de deporte",
    icon: FitnessCenterIcon,
  },
  {
    name: "Piscina libre",
    description: "Piscina de exterior fresca y sin viento para nadar tranquilo",
    icon: PoolIcon,
  },
];
