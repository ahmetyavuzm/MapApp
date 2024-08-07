import React from "react";
import Group from "../models/Group";

import {useNavigate} from "react-router-dom";
import constants from "../constants";

import {useMapContext} from "../contexts/MapContext";

const AddButtonDropdownMenu = ({item}) => {
    const navigate = useNavigate();

    const {setEditItem, setMapEvent} = useMapContext();
  const addGeometry = (value) => {
    let info = {}
    info.groupId = item.id;
    info.type = value;
    console.log("Info: ", info, "ıTem", item); 
    setEditItem({
      info: info,
    });
    if(value === "Group"){
      setMapEvent(constants.ADD_GROUP);
    }else if(value === "Point"){
      setMapEvent(constants.DRAW_POINT);
    }else if(value === "LineString"){
      setMapEvent(constants.DRAW_LINE);
    }else if(value === "Polygon"){
      setMapEvent(constants.DRAW_POLYGON);
    }

    navigate("..")
  };

  return (
    <div className=" w-fit h-fit text-lg bg-white border-[1px] border-black rounded-xl  flex flex-col items-center justify-center overflow-hidden">
      <div
        onClick={() =>addGeometry("Group")}
        className="w-full text-start hover:bg-slate-200 py-1 px-4"
      >
        Group
      </div>
      <div
        onClick={() => addGeometry("Point")}
        className="w-full text-start hover:bg-slate-200 py-1 px-4"
      >
        Point
      </div>
      <div
        onClick={() => addGeometry("LineString")}
        className="w-full text-start hover:bg-slate-200 py-1 px-4"
      >
        Line
      </div>
      <div
        onClick={() => addGeometry("Polygon")}
        className="w-full text-start hover:bg-slate-200 py-1 px-4"
      >
        Polygon
      </div>
    </div>
  );
};

export default AddButtonDropdownMenu;
