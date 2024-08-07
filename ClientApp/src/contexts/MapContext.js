// UserProvider.js
import React from "react";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { onAuthStateChanged, RecaptchaVerifier } from "firebase/auth";

import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

import constants, { DRAW_LINESTRING, IDLE } from "../constants";
import Layer from "../models/Layer";

import Point from "ol/geom/Point";
import Geometry, {
  createFeature,
  normal_style,
  selected_style,
} from "../models/Geometry";

import Group from "../models/Group";

import { Draw ,Modify} from "ol/interaction";
import { LineString } from "ol/geom";

import { Stroke, Style, Circle as CircleStyle, Fill } from "ol/style";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "ol/transform";
import { get } from "ol/style/IconImage";
import { toast } from "react-toastify";

const MapContext = React.createContext();


const poligonStyle = (feature) => {
  const drawStyle = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
      lineCap: "round", // Köşeleri yuvarlak yapar
      lineJoin: "round", // Köşeleri yuvarlak yapar
    }),
    fill: new Fill({
      color: "rgba(255, 0, 0, 0.1)", // Poligon içini hafif şeffaf kırmızı yapar
    }),
  });

  // Draw etkileşimini oluşturun
  let getStyle = (feature) => {
      const geometry = feature.getGeometry();
      const coordinates = geometry.getCoordinates(); // İlk ring (dış poligon) al
      const styles = [drawStyle];

      // Köşe noktalarına daire ekleyin
      coordinates.forEach(function (coord) {
        styles.push(
          new Style({
            geometry: new Point(coord),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: "blue" }),
              stroke: new Stroke({
                color: "white",
                width: 2,
              }),
            }),
          })
        );
      });

      return styles;
    }

  return getStyle(feature);
}

const lineStyle = (feature) => {
  const drawStyle = new Style({
    stroke: new Stroke({
      color: "red",
      width: 2,
      lineCap: "round", // Köşeleri yuvarlak yapar
      lineJoin: "round", // Köşeleri yuvarlak yapar
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({
        color: "white",
        width: 2,
      }),
    }),
  });

  const getStyles = (feature) => {
    console.log("Feature 2:", feature);
      const geometry = feature.getGeometry();
      const coordinates = geometry.getCoordinates();
      const styles = [drawStyle];

      // Köşe noktalarına daire ekleyin
      coordinates.forEach(function (coord) {
        styles.push(
          new Style({
            geometry: new Point(coord),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: "blue" }),
              stroke: new Stroke({
                color: "white",
                width: 2,
              }),
            }),
          })
        );
      });

      return styles;
    }

    console.log("Feature:", feature);
    return getStyles(feature);
}

const pointStyle = () => {
  const drawStyle = new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'red',
      }),
      stroke: new Stroke({
        color: 'black',
        width: 1,
      }),
    }),
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.1)',
    }),
  });

  return drawStyle;
}


export const MapProvider = ({ children }) => {
  const [temporaryLayer, setTemporaryLayer] = React.useState(null);
  const [modify, setModify] = React.useState(null);
  const [draw, setDraw] = React.useState(null);

  const [map, setMap] = React.useState(null);
  const [mapEvent, setMapEvent] = React.useState(constants.IDLE);
  const [mapInfo, setMapInfo] = React.useState(null);
  const [editItem, setEditItem] = React.useState(null);
  const [basePath, setBasePath] = React.useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const getBasePath = () => {

    let splitted = location.pathname.split("/");
    let str = "";
    console.log("Location: ", location.pathname);
    console.log(splitted)
    for (let path of splitted) {
      console.log("Path: ", path);
      str += path
      console.log("Auth: ", AuthService.auth.currentUser.uid);
      if(path.includes(AuthService.auth.currentUser.uid)){
        break;
      }
      str += "/"
    }

    return str;
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(AuthService.auth, async (user) => {
      if (user) {
        getMapInfo();
        createMap();
        let path = getBasePath();
        console.log("Base Path: ", path);
        navigate(path);
        setBasePath(path);
      } else {
        setMap(null);
        setMapInfo(null);
        setEditItem(null);
        setBasePath(null);
        setMapEvent(constants.IDLE);

        console.log("User not authenticated");
      }
    });

    

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    clearEvents();

    if (map && mapEvent) {
      handleMapEvent();
    }

    return () => {
      clearEvents();
      //clearTemporaryLayer();
    };
  }, [mapEvent]);

  React.useEffect(() => {
    if (mapInfo && map) {
      for (let layer of mapInfo) {
        if (!isLayerExistOnMap(layer.vectorLayer)) {
          console.log("New Layer: ", layer);
          map.addLayer(layer.vectorLayer);
        }
      }
    }
  }, [mapInfo, map]);

  React.useEffect(() => {
    if (temporaryLayer) {
    }
  }, [temporaryLayer]);

  const createMap = () => {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const baseStyle = selected_style();

    const temporaryVectorLayer = new VectorLayer({
      source: new VectorSource(),
      id: "temporary",
      style:  [
        selected_style(),
      ]
    });


    const map = new Map({
      layers: [tileLayer, temporaryVectorLayer],
      view: new View({
        center: [3948140, 4717451],
        zoom: 6.5,
      }),
    });

    setTemporaryLayer(temporaryVectorLayer);
    setMap(map);
  };

  const isLayerExistOnMap = (layer) => {
    return map.getLayers().getArray().includes(layer);
  };

  const addTemporaryFeature = (feature) => {
    temporaryLayer.getSource().addFeature(feature);
  };

  const getMapInfo = async () => {
    const response = await UserService.getUserLayers(
      AuthService.auth.currentUser.uid
    );
    console.log("Response: ", response);
    let layers = [];
    for (let info of response.data) {
      let layer = new Layer(info);
      layers.push(layer);
    }
    setMapInfo(layers);
  };

  // Map Info Functions

  const _getGeometryByIdRec = (group, id) => {
    for(let geom of group.geometries){
      if(geom.type === "GROUP"){
        let founded =  _getGeometryByIdRec(geom, id);
        if(founded){
          return founded;
        }
      }
      
      if(geom.id === id){
        return geom
      }
    }
    return null;
  };
  const getGeometryById = (id) => {
      for(let layer of mapInfo){
        let geom = _getGeometryByIdRec(layer.group, id);
        if(geom){
          return geom;
        }
      };
  };


  const _getGroupByIdRec = (group, id) => {
    if(group.id === id){
      return group;
    }else{
      for(let geom of group.geometries){
        if(geom.type === "GROUP"){
          let founded =  _getGroupByIdRec(geom, id);
          if(founded){
            return founded;
          }
        }
      }
    }
    return null;
  };

  const getGroupById = (id) => {
    for(let layer of mapInfo){
      let group = _getGroupByIdRec(layer.group, id);
      if(group){
        return group;
      }
    }
  };


  

  const addGroup = async (data) => {
    let res = await UserService.addGroup(data);
    if(res.isSuccess){
      
      if(res.data.groupId === null){
        toast.success("Layer added successfully");
        mapInfo.push(new Layer(res.data));
        setMapInfo([...mapInfo]);
      }else{
        toast.success("Group added successfully");
        parent = getGroupById(res.data.groupId);
        console.log("Parent: ", parent);
        let group  = new Group(res.data);
        group.layer = parent.layer;
        parent.geometries.push(group);
      }
    }
    setMapEvent(constants.IDLE);
    clearTemporaryLayer();
    navigate(basePath);
    return res;
  };


  const updateGroup = async (data) => {
    console.log("Data",data)
    let res = await UserService.updateGroup(data);

    if(res.isSuccess){
      
      if(res.data.groupId === null){
        toast.success("Layer updated successfully");
        let layer_group = getGroupById(res.data.id);
        layer_group.update(res.data);
      }else{
        toast.success("Group updated successfully");
        let group = getGroupById(res.data.id);
        let parent = getGroupById(group.groupId);
        console.log("Parent Founded: ", parent);
        group.layer = parent.layer;
        group.update(res.data);
      }
    }
    setMapEvent(constants.IDLE);
    clearTemporaryLayer();
    navigate(basePath);
    return
  };

  const deleteGroup = async (id) => {
    let res = await UserService.deleteGroup(id);
    if(res.isSuccess){
      
      let group = getGroupById(id);
      let parent = getGroupById(group.groupId);

      if(parent){
        toast.success("Group Deleted Successfully");
        parent.deleteGeometry(group);
      }else{
        toast.success("Layer Deleted Successfully");
        let group = getGroupById(id);
        let newInfo = mapInfo.filter(layer => layer.group.id !== id); 
        map.removeLayer(group.layer.vectorLayer);
        setMapInfo([...newInfo]);
      }
    }else{
      toast.error("Failed to Delete Item");
    }
    setMapEvent(constants.IDLE);
    clearTemporaryLayer();
    navigate(basePath);
    return
  };


  const addGeometry = async (data) => {

   let res = await UserService.addGeometry(data);

    if(res.isSuccess){
      toast.success("Item added successfully");
      console.log("res",res)
      let group = getGroupById(res.data.groupId);
      let geometry = new Geometry(res.data); // type'a göre değişmeli
      group.addGeometry(geometry);
    }

    setMapEvent(constants.IDLE);
    clearTemporaryLayer();
    navigate(basePath);
   return res;
  }

  const updateGeometry = async (data) => {
    let res = await UserService.updateGeometry(data);

    if(res.isSuccess){
      toast.success("Item updated successfully");
      let geometry = getGeometryById(data.id);
      geometry.update(data);
      let parent = getGroupById(data.groupId);
      parent.updateGeometry(geometry);
    }
    setMapEvent(constants.IDLE);
    clearTemporaryLayer();
    navigate(basePath);
    return res;
  };


  const deleteGeometry = async (id) => {
    
    let res = await UserService.deleteGeometry(id);

    if (res.isSuccess) {
        toast.success("Item Deleted Successfully");
        let geometry = getGeometryById(id);
        let parent = getGroupById(geometry.groupId);
        parent.deleteGeometry(geometry);
      } else {
        toast.error("Failed to Delete Item");
      }
    setMapEvent(constants.IDLE);
    navigate(basePath);
  }


  //EVENT HANDLERS

  const handleMapEvent = () => {
    console.log("Map Event: ", mapEvent);

    if (mapEvent === constants.DRAW_POINT) {
      DRAW_EVENT("Point");
    } else if (mapEvent === constants.DRAW_LINESTRING) {
      DRAW_EVENT("LineString");
    } else if (mapEvent === constants.DRAW_POLYGON) {
      DRAW_EVENT("Polygon");
    }else if(mapEvent === constants.ADD_GROUP){
      if(!(editItem && editItem.info)){
        editItem.info = {
          type: "Group",
        };
      }
      navigate(basePath+"/addgeometry");
    }else if (mapEvent === constants.ADD_LAYER) {
      setEditItem({
        info: {
          type: "Layer",
        },
      });  
      navigate(basePath + "/addgeometry");
    }
    else if (mapEvent === constants.EDIT) {
      EDIT_EVENT();
    } else if (mapEvent === constants.IDLE) {
      IDLE_EVENT();
    }
  };

  const IDLE_EVENT = () => {
    if(modify){
      modify.setActive(false);
      map.removeInteraction(modify);
    }

    if(draw){
      draw.setActive(false);
      map.removeInteraction(draw);
    }
    
    let splitted = location.pathname.split("/");
    if(!AuthService.auth.currentUser.uid === splitted[splitted.length - 1]){
      navigate(basePath);
    }
    setEditItem(null);
    clearTemporaryLayer();
    clearEvents();
    setCursor("default");
  };

  const EDIT_EVENT = () => {
    clearTemporaryLayer();
    if(editItem.feature){
      zoomFeature(editItem.feature);
      addTemporaryFeature(editItem.feature);
      editItem.feature.setStyle(selected_style());

    }
    

    if (editItem.item instanceof Geometry) {
      editItem.item.hideElement();
      setCursor("pointer");
    }

    const modify = new Modify({
      source: temporaryLayer.getSource(),
    });

    modify.setActive(true);


    modify.on('modifyend', (event) => {
      editItem.feature = event.features.getArray()[0];
      setEditItem({...editItem});
    });

    map.addInteraction(modify);

    setModify(modify);




      
  };

  const DRAW_EVENT = (type, options) => {
    let draw = new Draw({
      source: temporaryLayer.getSource(),
      type: type,
      ...options,
    });

    setDraw(draw);

    draw.on("drawend", (event) => {
      draw.setActive(false);
      const feature = event.feature;
      setEditItem({
        info:editItem ? editItem.info: undefined,
        feature: feature,
      });
      setMapEvent(constants.EDIT);
      map.removeInteraction(draw);
      navigate(basePath + "/addgeometry");
    });

    map.addInteraction(draw);
  };


  const setCursor = (cursor) => {
    map.getTargetElement().style.cursor = cursor;
  };

  const clearEvents = () => {
    

    if(temporaryLayer){
      clearTemporaryLayer();
    }
    if(editItem){
      console.log("Edit Item: ", editItem);
      if(editItem.item && editItem.item instanceof Geometry){
        editItem.item.unSelectElement();
      }
    }
    
  };

  const clearTemporaryLayer = () => {
    temporaryLayer.getSource().clear();
  };

  const zoomFeature = (feature) => {
    if (!map) return;

    const extent = feature.getGeometry().getExtent();
    const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];

    const view = map.getView();
    const resolution = view.getResolutionForExtent(extent, map.getSize());
    const zoom = view.getZoomForResolution(resolution) - 1; // Adjust zoom level as needed

    // Calculate the offset for the feature to be on the right side
    const offsetX = map.getSize()[0] / 100;
    const pixel = map.getPixelFromCoordinate(center);
    pixel[0] -= offsetX;
    const newCenter = map.getCoordinateFromPixel(pixel);

    view.animate({
      center: newCenter,
      zoom: 10,
      duration: 1000,
    });
  };


  return (
    <MapContext.Provider
      value={{ map, setMap, mapEvent, setMapEvent, editItem, setEditItem, mapInfo, setMapInfo, getGeometryById, getGroupById, addGeometry , updateGeometry, deleteGeometry, addGroup, updateGroup, deleteGroup}}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => React.useContext(MapContext);
