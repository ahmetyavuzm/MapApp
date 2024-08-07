import ParentComponent from "../../components/ParentCompenent";

import React from "react";
import { useMapContext } from "../../contexts/MapContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Layers = () => {
  const { setMapEvent} = useMapContext();
  const {mapInfo} = useMapContext();

  const createLayer = () =>{
    setMapEvent("ADD_LAYER");
  }
  return (
    
  <div className="w-full h-full p-3 overflow-y-auto overflow-x-visible ">
  <div className="pb-3">
    <div className="h-fit w-full flex justify-between items-center">
      <label className="text-3xl m-1">Layers</label>
      <div
          onClick={() => createLayer()}
           className="cursor-pointer flex justify-center items-center  rounded-full hover:bg-blue-300 w-[35px] aspect-square m-1">
            <FontAwesomeIcon
              icon={faPlus}
              className="text-black text-[20px] "
              
            />
      </div>
    </div>
    
    
    <div className="w-full h-0.5 bg-black"></div>
  </div>

  <div className="w-full h-fit">
  {mapInfo && mapInfo.length> 0 ?  mapInfo.map((layer, index) => {
      return (
        <div key={index} className="w-full h-fit">
          <ParentComponent self={layer.group} parentIsShow={null}/>
        </div>
      );
    }) : <div className="w-full h-full p-20 flex items-center justify-center font-bold text-slate-500  text-2xl">
        <div>No Layer</div>
      </div>}

  </div>
  </div>

  );
};

export default Layers;
