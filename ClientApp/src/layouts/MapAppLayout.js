import React from "react";
import { Outlet } from "react-router-dom";
import MapComponent from "../components/Map";
import MapMenu from "../components/MapMenu";

import { useNavigate , useLocation} from "react-router-dom";
import MapNavbar from "../components/MapNavbar";
import { motion } from "framer-motion";

import { onAuthStateChanged } from "firebase/auth";
import AuthService from "../services/AuthService";

import Constants, { IDLE } from "../constants";

const MapAppLayout = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  React.useEffect(() => {
    if (location.pathname.includes("addgeometry")) {
      setIsOpen(true);
    }else if(location.pathname.includes("layers")){
      setIsOpen(true);
    }else if(location.pathname.includes("editgeometry")){
      setIsOpen(true);
    }else{
      setIsOpen(false);
    }
    
  }, [location]);



  return (
    <div className="relative w-screen h-screen flex justify-center items-center z-0 overflow-hidden">
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isOpen ? "-110%" : 0 }}
      transition={{ type: "linear", duration: isOpen ? 10 : 0.5 }}
      className="h-fit w-fit absolute z-10 left-0 flex items-center justify-center"
    >
      <MapNavbar isOpen={isOpen} setIsOpen={setIsOpen}/>
    </motion.div>
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "linear", duration: isOpen ? 0.5 : 0.2 }}
      className="h-fit w-fit absolute z-10 left-0 flex items-center justify-left"
    >

      <MapMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        <Outlet/>
      </MapMenu>
     
    </motion.div>
    <MapComponent />
  </div>
  );
};

export default MapAppLayout;
