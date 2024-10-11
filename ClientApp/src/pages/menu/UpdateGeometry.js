import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { useNavigate, useOutletContext } from "react-router-dom";
import constants from "../../constants";
import { useMapContext } from "../../contexts/MapContext";
import { set } from "ol/transform";
import Layer from "../../models/Layer";

import WKT from 'ol/format/WKT';
import Group from "../../models/Group";
import { Geometry } from "ol/geom";


const wkt = new WKT();

const UpdateGeometry = () => {
  const { editItem, setEditItem, event, setEvent, mapInfo, getGroupById, updateGeometry, deleteGeometry, updateGroup, deleteGroup} =
    useMapContext();
  const [feature, setFeature] = useState(null);

  const [parents, setParents] = useState([undefined]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Group");
  const [properties, setProperties] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const navigate = useNavigate();

  const createEmptyProperty = () => {
    properties.push({ key: "", value: "", type: "string" });
    setProperties([...properties]);
  };
  const createProperty = (key, value, type) => {
    properties.push({ key: key, value: value, type: type });
    setProperties([...properties]);
  };

  const deleteProperty = (index) => {
    let new_properties = properties.filter((prop, i) => {
      return i != index;
    });
    setProperties(new_properties);
  }

  React.useEffect(() => {
    console.log("Properties: ", properties);
  }, [properties]);

  const updateFeatureCooridinates = (new_coordinates) => {
    const type = getType(feature);
    if (type === "Point") {
      feature.getGeometry().setCoordinates(new_coordinates[0]);
    } else if (type === "LineString") {
      feature.getGeometry().setCoordinates(new_coordinates);
    } else if (type === "Polygon") {
      feature
        .getGeometry()
        .setCoordinates([[...new_coordinates, new_coordinates[0]]]);
    }
  };

  const deleteCoordinate = (index) => {
    if (coordinates.length <= getMinCoord()) {
      toast.error("Minimum Coordinates Reached");
      return;
    }

    let new_coordinates = coordinates.filter((coord, i) => {
      return i != index;
    });
    setCoordinates(new_coordinates);
    updateFeatureCooridinates(new_coordinates);
  };

  const getMinCoord = () => {
    const type = getType(feature);

    if (type === "Point") {
      return 1;
    } else if (type === "LineString") {
      return 2;
    } else if (type === "Polygon") {
      return 3;
    }
  };

  const getType = (feature) => {
    return feature.getGeometry().getType();
  };

  React.useEffect(() => {
    if (mapInfo) {
      setParents([mapInfo[0].group.id]);
    }
  }, [mapInfo]);


  const getParents = (parentId) => {

    let parent = getGroupById(parentId);
    console.log("Parent: ", parent);
    let parents = [];
    while (parent) {
      parents.push(parent.id);
      parent = getGroupById(parent.groupId);
    }
    return parents.reverse(); 
  };

  React.useEffect(() => {
    console.log("Edit Item: ", editItem);
    if (editItem) {
      if(editItem.feature){
        updateCoordinates(editItem.feature);
      }
      if (editItem.item) {
        let nameProp = editItem.item.properties.filter((prop, index) => {
          return prop.key.toLowerCase() === "name";
        })[0];
        setName(nameProp.value);
        setProperties(editItem.item.properties.filter((prop, index) => {
          return prop.key.toLowerCase() !== "name";
        }));
        if(editItem.item.groupId){
          console.log("Parents: ", getParents(editItem.item.groupId));
          setParents(getParents(editItem.item.groupId));
        }else{
          setParents([]);
        }
      }
    }
  }, [editItem]);

  React.useEffect(() => {
    if (feature) {
      if (
        JSON.stringify(feature.getGeometry().getCoordinates()) !==
        JSON.stringify(coordinates)
      ) {
        updateFeatureCooridinates(coordinates);
      }
    }
  }, [coordinates]);

  const updateCoordinates = (feature) => {
    setFeature(feature);
    console.log("Feature: ", feature);
    if (feature) {
      const geometry = feature.getGeometry();
      let coordinates = geometry.getCoordinates();
      const type = geometry.getType();

      if (type === "Point") {
        setCoordinates([coordinates]);
      } else if (type === "LineString") {
        setCoordinates(coordinates);
      } else if (type === "Polygon") {
        //console.log(coordinates);
        coordinates = coordinates[0].slice(0, coordinates[0].length - 1);
        //console.log(coordinates);
        setCoordinates(coordinates);
      }
      setType(type);
    }
  };

  React.useEffect(() => {
    if (parents) {
      let parentId = parents[parents.length - 1];
      if (Number.isNaN(Number(parentId))) {
        return;
      }
      const last_parent = getGroupById(parentId);

      let groups = last_parent.geometries.filter((geometry, index) => {
        return geometry.type === "GROUP";
      });
      if (groups.length > 0) {
        setParents([...parents, undefined]);
      }
    }
  }, [parents]);


  const handleUpdate = async () => {

    if(name === ""){
      toast.error("Name is required");
      return;
    }
    console.log("Update Geometry", editItem.item);
    if(editItem.item && (editItem.item.type.toLowerCase() == "group" || editItem.item.type.toLowerCase() === "layer")){
      let data = {
        id: editItem.item.id,
        type: type,
        properties: [{"key": "Name", "value": name, "type": "string"}, ...properties],
        groupId: editItem.item.groupId ? parents[parents.length - 1] === undefined ? parents[parents.length - 2] : parents[parents.length - 1]: null,
      };
  
      await updateGroup(data);
    }else if(editItem.item){
      let data = {
        id: editItem.item.id,
        type: type,
        properties: [{"key": "Name", "value": name, "type": "string"}, ...properties],
        wkt: wkt.writeFeature(feature),
        groupId: parents[parents.length - 1] === undefined ? parents[parents.length - 2] : parents[parents.length - 1],
      };
  
      await updateGeometry(data);
    }

  };

  const handleDelete = async () => {
    if(editItem.item && (editItem.item.type.toLowerCase() == "group" || editItem.item.type.toLowerCase() === "layer")){
      console.log("Delete Geometry", editItem.item);
      let res = await deleteGroup(editItem.item.id)
      console.log("Delete Group", res);
    }else if(editItem.item){
      console.log("Delete Geometry", editItem.item);
      let res = await deleteGeometry(editItem.item.id)
    }
  };

  return (
    <div className="w-full h-full p-3 overflow-y-auto">
      <div className="pb-3">
        <label className="text-3xl m-1">Update Item</label>
        <div className="w-full h-0.5 bg-black"></div>
      </div>
      <div className=" ">
        <label>Type</label>
        <input
          value={type}
          disabled={true}
          className=" text-black border-black outline-black  w-full border-[1px] rounded-xl px-2 py-2"
        />
      </div>

      {mapInfo &&
        parents.map((parent, index) => {
          let groups = null;
          let label = null;

          if (index === 0) {
            groups = mapInfo.map((layer, index) => {
              return layer.group;
            });

            label = "Layer";
          } else {
            let parentId = null;
            parentId = Number(parents[index - 1]);
            const parentItem = getGroupById(parentId);

            groups = parentItem.geometries.filter((geometry, index) => {
              return geometry.type === "GROUP";
            });

            if(editItem.item instanceof Group || editItem.item instanceof Layer){
              groups = groups.filter((group, index) => {
                return group.id !== editItem.item.id;
              });
            }

            if(groups.length === 0){
              return <></>;
            }

            label = "Group";
          }

          return (
            <div className=" " key={index}>
              <label>{label}</label>
              <select
                value={parents[index]}
                onChange={(e) => {
                  let num = Number(e.target.value);
                  if (Number.isNaN(num)) {
                    parents[index] = undefined;
                    setParents([...parents.slice(0, index)]);
                  } else {
                    parents[index] = num;
                    setParents([...parents]);
                  }
                }}
                className=" text-black border-black outline-black  w-full border-[1px] rounded-xl px-2 py-2"
              >
                {index === 0 ? <></> : <option value={undefined}>None</option>}(
                {groups.map((group, i) => {
                  return (
                    <option key={i} value={group.id}>
                      {group.properties.filter((prop, index) => {
                        return prop.key.toLowerCase() === "name";
                      })[0].value}
                    </option>
                  );
                })}
                )
              </select>
            </div>
          );
        })}

      <div className=" ">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
          className="text-black border-black outline-black  w-full border-[1px] rounded-xl px-2 py-2"
          type="text"
          id="name"
          name="name"
        />
      </div>

      <div className="">
        <div className="flex items-center justify-between border-b-2 border-black my-2">
          <label>Properties</label>
          <div className="flex justify-center items-center  rounded-full hover:bg-blue-300 w-[35px] aspect-square m-1">
            <FontAwesomeIcon
              icon={faPlus}
              className="text-black text-[20px] cursor-pointer "
              onClick={() => createEmptyProperty()}
            />
          </div>
        </div>
        <div className=" flex items-center justify-start flex-wrap">
        {properties.length> 0 ? properties.map((coord, index) => {
          //console.log(coord);
          return (
            <div
              key={index}
              className="flex-col items-center justify-between w-11/24 h-fit my-2 border-black border-[1px] border-dashed rounded-xl p-2 mx-[1px]"
            >
              <div className="flex items-center justify-between w-full h-fit m-1">
                <div className="mr-1  w-1/4 text-nowrap">{`Type :`}</div>
                <select
                
                  value={properties[index].type}
                  onChange={(e) => {
                    properties[index].value = "";
                    properties[index].type = e.target.value;
                    setProperties([...properties]);
                  }}
                  className="text-black border-black outline-black  w-full border-[1px] rounded-xl py-2"
                  type="number"
                >
                  <option  value="string">
                    String
                  </option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
              </div>
              <div className="flex items-center justify-between w-full h-fit m-1">
                <div className="mr-1 w-1/4 text-nowrap">{`Key :`}</div>
                <input
                  value={properties[index].key}
                  onChange={(e) => {
                    properties[index].key = e.target.value;
                    setProperties([...properties]);
                  }}
                  className="text-black border-black outline-black  w-full border-[1px] rounded-xl p-1 py-2"
                  type="text"
                />
              </div>

              <div className="flex items-center justify-between w-full h-fit m-1">
                <div className="mr-1 w-1/4 text-nowrap">Value :</div>
                {properties[index].type === "boolean" ? (
                  <select
                  value={properties[index].value}
                  onChange={(e) => {
                    console.log(e.target.value);
                    properties[index].value = e.target.value.toLowerCase() === 'true';
                    setProperties([...properties]);
                  }}
                  className="text-black border-black outline-black  w-full border-[1px] rounded-xl py-2"
                  type="bool"
                >
                  <option value="" disabled selected>Select</option>
                  <option value={true}>
                    True
                  </option>
                  <option value={false}>False</option>
                </select>
                ): (<input
                  value={properties[index].value}
                  onChange={(e) => {
                    e.preventDefault();
                    properties[index].value = e.target.value;
                    setProperties([...properties]);
                  }}
                  className="text-black border-black w-full outline-black border-[1px] rounded-xl p-1 py-2"
                  type={properties[index].type}
                />)}
                
              </div>
              <div
                onClick={() => deleteProperty(index)}
                className="bg-red-400 hover:bg-red-700 disabled:bg-slate-200 transition duration-200 m-1 p-2 rounded-xl w-full flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  className="text-white text-[20px] "
                />
              </div>
            </div>
          );
        }) : <div className="text-20px text-slate-500 text-center w-full h-fit">

        No Properties

        </div>}
        </div>
        
      </div>

      {type != "Group" ? (
        <div>
          <div className="flex items-center justify-between border-b-2 border-black">
            <label>Coordinates</label>
          </div>

          {coordinates.map((coord, index) => {
            //console.log(coord);
            return (
              <div
                key={index}
                className="flex items-center justify-between w-full h-fit my-2"
              >
                <div className="flex items-center justify-start w-fit h-fit mx-1">
                  <div className="mr-2 w-full text-nowrap">{`X :`}</div>
                  <input
                    value={coord[0]}
                    onChange={(e) => {
                      let temp = [...coordinates];
                      temp[index][0] = Number(e.target.value);
                      e.preventDefault();
                      setCoordinates(temp);
                    }}
                    className="text-black border-black outline-black  w-fit border-[1px] rounded-xl px-2 py-2"
                    type="number"
                    id={"coordinates_x_" + index}
                    name={"coordinates_x_" + index}
                  />
                </div>
                <div className="flex items-center justify-start w-fit h-fit mx-1">
                  <div className="mr-2 w-full  text-nowrap">Y :</div>
                  <input
                    value={coord[1]}
                    onChange={(e) => {
                      let temp = [...coordinates];
                      temp[index][1] = Number(e.target.value);
                      e.preventDefault();
                      setCoordinates(temp);
                    }}
                    className="text-black border-black outline-black  w-fit border-[1px] rounded-xl px-2 py-2"
                    type="number"
                    id={"coordinates_y_" + index}
                    name={"coordinates_y_" + index}
                  />
                </div>
                <div
                  disabled={coordinates.length < getMinCoord()}
                  onClick={() => deleteCoordinate(index)}
                  className="bg-red-400 hover:bg-red-700 disabled:bg-slate-200 transition duration-200 mx-1 p-2 rounded-xl h-fit aspect-square flex items-center justify-center cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-white text-[20px] "
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}

      <div className="flex items-center justify-center w-full h-fit mt-10">
      <div className="w-full h-14 px-3.5 m-1 py-2 bg-red-500 rounded-xl justify-center items-center gap-1 inline-flex cursor-pointer transition duration-200 ease-in hover:shadow-lg hover:bg-red-900  hover:-translate-y-[2px]">
            <div onClick={() => handleDelete()} className="w-full h-full flex items-center justify-center text-center text-white text-base  font-semibold ">
            Delete
            </div>
          </div>

      <div className="w-full h-14 px-3.5 m-1 py-2 bg-black rounded-xl justify-center items-center gap-1 inline-flex cursor-pointer transition duration-200 ease-in hover:shadow-lg hover:bg-black/90  hover:-translate-y-[2px]">
        <div
          onClick={() => handleUpdate()}
          className="w-full h-full flex items-center justify-center text-center text-white text-base  font-semibold "
        >
          Update
        </div>
      </div>
      </div>
    </div>
  );
};

export default UpdateGeometry;
