// components/Map.js
import React from "react";
import "ol/ol.css";

import Overlay from "ol/Overlay";

import constants , { DRAW_POINT, DRAW_LINE, DRAW_POLYGON, IDLE, EDIT } from "../constants";


import { useNavigate } from "react-router-dom";
import { useMapContext } from "../contexts/MapContext";

const MapComponent = () => {

  const {map,mapInfo, mapEvent, setMapEvent, getGeometryById, editItem, setEditItem} = useMapContext();
  const mapRef = React.useRef(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if(map){
      map.setTarget(mapRef.current);
    }
  }, [map]);

  React.useEffect(() => {

    if(map){
      if(mapEvent === constants.IDLE){
        console.log("IDLE");
        map.on("pointermove", isFeature);
        map.on("movestart", removePopup);
        map.on("click", drawPopup);
      }
    }

    return () => {
      if(map){
        map.un("pointermove", isFeature);
        map.un("movestart", removePopup);
        map.un("click", drawPopup);
      }
    };
  }, [
    mapEvent, map, mapInfo,drawPopup, isFeature
  ]);


  const [popupContent, setPopupContent] = React.useState("");
  const popupContainerRef = React.useRef(null);
  const popupContentRef = React.useRef(null);
  const popupCloserRef = React.useRef(null);

  


  const selectFeature = (e, feature) => {

    let clone = feature.clone();
    removePopup(e);
    //console.log("Feature: ", feature);
    let id = feature.get("id");
    //console.log("ID: ", id);
    let geometry = getGeometryById(id);
    //console.log("Geometry: ", geometry);
    setEditItem({
      item: geometry,
      feature: clone
    });
    setMapEvent(EDIT);
    navigate("./editgeometry");
  };

  const isFeature = (e) => {
    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    mapRef.current.style.cursor = hit ? "pointer" : "";
  };

  const removePopup = (e) => {
    popupContainerRef.current.style.display = "none";
  };

  const drawPopup = (e) => {
    popupContainerRef.current.style.display = "block";
    const overlay = new Overlay({
      element: popupContainerRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      positioning: "bottom-center",
    });

    map.addOverlay(overlay);

    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    if (feature) {
      const extent = feature.getGeometry().getExtent();
      const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
      console.log("Feature: ", feature);

      const props = feature.get("properties");
      
      setPopupContent(
        <div className="p-1 w-fit h-fit">
          {props.map((prop, index) => {
            console.log("Prop: ", prop);
            return <div key={index} className="text-black w-full h-fit flex justify-start">
              <div className="font-bold mr-1">{prop.key} : </div>
              <div>{prop.value.toString()}</div>
            </div>
          })}          

          <div
            onClick={(e) => {
              selectFeature(e, feature);
            }}
            className="w-full h-fit mt-2 bg-slate-200 transform duration-300 hover:bg-black rounded-xl text-center hover:text-white cursor-pointer"
          >
            Edit
          </div>
        </div>
      );
      
      overlay.setPosition(center);
    } else {
      overlay.setPosition(undefined);
      //popupCloserRef.current.blur();
    }
  };

    return (
    mapRef ? (
    <div className="w-full h-full">
      <div ref={mapRef} id="map" className="z-0 w-full h-full"></div>;
      <div
        ref={popupContainerRef}
        className="w-fit h-fit bg-white border-[1px] border-black rounded-xl overflow-hidden"
      >
        <div ref={popupContentRef}>{popupContent}</div>
      </div>
    </div>) : <></>
  );
};

export default MapComponent;
