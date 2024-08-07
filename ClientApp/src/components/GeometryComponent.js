import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";

import constants from "../constants";
import { useNavigate } from "react-router-dom";
import { set } from "ol/transform";

import { useMapContext } from "../contexts/MapContext";

const GeometryComponent = ({ self, parentIsShow }) => {
  const { setEditItem, setMapEvent } = useMapContext();
  const [isShow, setIsShow] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const name = self.properties.filter(
    (prop) => prop.key.toLowerCase() === "name"
  )[0].value;

  const open = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setIsShow(parentIsShow);
  }, [parentIsShow]);

  React.useEffect(() => {
    if (!isShow) {
      self.hideElement();
    } else {
      self.showElement();
    }
  }, [isShow]);

  const edit = () => {
    setEditItem({
      feature: self.feature.clone(),
      item: self,
    });
    setMapEvent(constants.EDIT);
    navigate("../editgeometry");
  };

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div
        style={{ backgroundColor: isOpen ? "#EEEEEE" : "white" }}
        className="w-full px-1 h-fit flex items-center justify-center  rounded-lg"
      >
        <img
          onClick={() => {
            setIsShow(!isShow);
          }}
          src={
            isShow ? "/images/checkboxTrue.png" : "/images/checkboxFalse.png"
          }
          alt="remember"
          width={16}
          height={15}
          className="cursor-pointer"
        ></img>

        <div className="w-full h-fit flex items-center justify-between">
          <label
            onClick={open}
            className="w-full text-opacity-30 ml-2 cursor-pointer"
          >
            {name}
          </label>
          <div className="w-fit h-fit flex items-center justify-center">
            <div className="text-slate-500">
                {`(${self.feature.getGeometry().getType()})`}
            </div>
            <div
              onClick={edit}
              className="w-fit h-fit flex items-center justify-center text-sm ml-1 cursor-pointer"
            >
              <FontAwesomeIcon icon={faPen} className="" />
            </div>

            <div
              onClick={open}
              className="w-fit h-fit flex items-center justify-center text-sm ml-1 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={isOpen ? faChevronUp : faChevronDown}
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className={
          `${isOpen ? "block" : "hidden"} ` + "w-full h-fit py-1 pl-[10px]"
        }
      >
        {self.feature ? (
          <div className="flex items-center justify-start w-full h-fit border-l-2 border-black">
            <div className="w-full h-fit">
            <div></div>
              {self.feature.getGeometry().getCoordinates().map((coord, index) => {
                return <div key={index}> {coord}</div>
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
};

export default GeometryComponent;
