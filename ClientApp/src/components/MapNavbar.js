import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLayerGroup,
  faDrawPolygon,
  faCirclePlus,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import constants, { DRAW_POLYGON, DRAW_POINT, IDLE } from "../constants";
import { useMapContext } from "../contexts/MapContext";
import { toast } from "react-toastify";




const MapNavbar = ({ isOpen, setIsOpen}) => {
   const navigate = useNavigate();

   const {mapInfo} = useMapContext();

   const {mapEvent, setMapEvent} = useMapContext();


   const buttons = [
      {
        icon: faHand,
        title: "Hand",
        event: IDLE,
        onClick: () => setMapEvent(IDLE),
      },
      {
        icon: faPen,
        title: "Draw Line",
        event: constants.DRAW_LINESTRING,
        onClick: () => {
          if(mapInfo && mapInfo.length >0 ){
            setMapEvent(constants.DRAW_LINESTRING);
          }else{
            toast.error("Please create a layer first");
          }
        },
      },

      {
        icon: faCirclePlus,
        title: "Draw Point",
        event: DRAW_POINT,
        onClick: () => {
          if(mapInfo && mapInfo.length >0 ){
            setMapEvent(constants.DRAW_POINT);
          }else{
            toast.error("Please create a layer first");
          }
        },
      },
      {
        icon: faDrawPolygon,
        title: "Draw Polygon",
        event: DRAW_POLYGON,
        onClick: () => {
          if(mapInfo && mapInfo.length >0 ){
            setMapEvent(constants.DRAW_POLYGON);
          }else{
            toast.error("Please create a layer first");
          }
        },
      },
   ]

  return (
    <div className="h-[500px] ml-2 w-full flex items-center justify-center ">
      <div className="w-[50px] h-full flex flex-col justify-around items-center bg-white rounded-3xl overflow-hidden">
        {buttons.map((button, index) => {
          return (
            <div
              key={index}
              onClick={button.onClick}
              className= {`w-full h-full  flex items-center justify-center cursor-pointer ${button.event === mapEvent ? " bg-blue-300" : "bg-[#FFFFFF] hover:bg-slate-200"}`}
            >
              <FontAwesomeIcon icon={button.icon} className="text-[20px]" />
            </div>
          );
        })}
      </div>

      <div
        onClick={() => {
          setIsOpen(true);
          navigate("./layers");
          setMapEvent(IDLE);

        }}
        className=" flex items-center justify-center rounded-r-full w-[30px] h-[200px] bg-[#FFFFFF] hover:bg-slate-200 z-10 cursor-pointer "
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-[20px]" />
      </div>
    </div>
  );
};

export default MapNavbar;
