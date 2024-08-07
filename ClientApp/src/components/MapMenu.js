import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLayerGroup,
  faDrawPolygon,
  faCirclePlus,
  faSignOut,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { icon } from "@fortawesome/fontawesome-svg-core";

import MenuButton from "./MenuButton";
import AuthService from "../services/AuthService";

import { useMapContext } from "../contexts/MapContext";
import { set } from "ol/transform";
import constants from "../constants";

const menuItemsBase = [
  {
    icon: faLayerGroup,
    title: "Layers",
    navigate: "./layers",
  },
];


const MapMenu = ({ children, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {mapEvent, setMapEvent} = useMapContext();

  const [menuItems, setMenuItems] = React.useState(menuItemsBase);

  const [activePage, setActivePage] = React.useState(1);

  React.useEffect(() => {
    
    let newMenuItems = [...menuItemsBase];

    if(location.pathname.includes("addgeometry")){
      let button = {
        icon: faCirclePlus,
        title: "Add Geometry",
        navigate: "./addgeometry",
      }
      newMenuItems.push(button);
    }else if(location.pathname.includes("editgeometry")){
      let button = {
        icon: faPen,
        title: "Edit Geometry",
        navigate: "./editgeometry",
      }
      newMenuItems.push(button);

    }
    setMenuItems(newMenuItems);

    newMenuItems.forEach((item, index) => {
      if (location.pathname.includes(item.navigate.split("/")[1])) {
        setActivePage(index+1);
        return;
      }
    });
    
  }, [location]);


  


  const signOut = async () => {
    await AuthService.signout();
    navigate("/");
  };

  return (
    <div className="w-[650px] h-screen flex items-center justify-center ">
      <div className="w-[75px] h-full bg-blue-300 flex flex-col items-center justify-start">
        <div className="w-full h-fit bg-white">
          <div className="w-full h-fit aspect-square cursor-pointer">
            <MenuButton
              activePage={activePage}
              order={0}
              icon={faX}
              color={"#fca5a5"}
              hoverColor={"#ef4444"}
              onClick={() => {
                setMapEvent(constants.IDLE);
                setIsOpen(false);
                navigate(".");
              }}
            />
          </div>

          {menuItems.map((item, index) => (
              
            <div className="w-full h-fit aspect-square cursor-pointer" key={index+1}>
              <MenuButton
                activePage={activePage}
                order={index+1}
                icon={item.icon}
                color={"#93c5fd"}
                hoverColor={"#3b82f6"}
                onClick={() => navigate(item.navigate)}
              />
            </div>
          ))}
          <div className="w-full h-fit aspect-square">
            <MenuButton
              activePage={activePage}
              order={menuItems.length + 1}
              icon={null}
              color={"#93c5fd"}
              hoverColor={"#93c5fd"}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-end">
          <div onClick={signOut} className="w-full h-fit aspect-square flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon icon={faSignOut} className="text-[20px]" />
          </div>
         
        </div>
      </div>
      <div className="w-full h-full bg-white">{children}</div>
    </div>
  );
};

export default MapMenu;
