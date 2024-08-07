import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
import GeometryComponent from "./GeometryComponent";
import AddButtonDropdownMenu from "./AddButtonDropdownMenu";
import Group from "../models/Group";
import constants from "../constants";
import { useNavigate } from "react-router-dom";

import { useMapContext } from "../contexts/MapContext";
import Geometry from "../models/Geometry";

const ParentComponent = ({self, parentIsShow}) => { 

    const {setEditItem, setMapEvent} = useMapContext();
    const [isShow, setIsShow] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

    const navigate = useNavigate();
    
    const name = self.properties.filter((prop) => prop.key.toLowerCase() === "name")[0].value;


    React.useEffect(() => {
        console.log("isShow:", self.isShow);
        if(parentIsShow !== null && parentIsShow !== undefined){
            setIsShow(parentIsShow);
        }
    }, [parentIsShow]);
    


    React.useEffect(() => {
        if(!isShow){
            //self.hideElement();
        }else{
            //self.showElement();
        }
    }, [isShow]);
    

    const handleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const open = () => {
        setIsOpen(!isOpen);
    }

    const edit = () => {
        setEditItem({
            item: self,
        });
        setMapEvent(constants.EDIT);
        navigate("../editgeometry");
    };






    return (
        <div  className="w-full h-fit flex flex-col items-center justify-center">

            <div style={{backgroundColor : isOpen ? "#EEEEEE":"white"}} className="w-full px-1 h-fit flex items-center justify-center  rounded-lg">
            <img
            onClick={() => {
                setIsShow(!isShow);
            }}
            src={
                isShow
                ? "/images/checkboxTrue.png"
                : "/images/checkboxFalse.png"
            }
            alt="remember"
            width={16}
            height={15}
            ></img>
            
            <div className="w-full h-fit flex items-center justify-between">
                <label onClick={open} className="w-full text-opacity-30 ml-2 cursor-pointer">{name}</label>
                <div className="w-fit h-fit flex items-center justify-center">
                    <div className="text-nowrap text-slate-500">
                        {`(${self.geometries.length} items)`}
                    </div>
                    <div onClick={handleDropDown} className="relative w-fit h-fit flex items-center justify-center text-sm ml-1 cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} className="relative" />
                        
                        {isDropDownOpen ? 
                            <div className="absolute top-3 right-0  z-10">
                                <AddButtonDropdownMenu item={self}/>
                            </div>
                        : <></>}
                    </div>
                    
                    <div onClick={edit} className="w-fit h-fit flex items-center justify-center text-sm ml-1 cursor-pointer">
                        <FontAwesomeIcon icon={faPen} className="" />
                    </div>

                    <div onClick={open} className="w-fit h-fit flex items-center justify-center text-sm ml-1 cursor-pointer">
                        <FontAwesomeIcon icon={isOpen? faChevronUp:faChevronDown} className="" />
                    </div>

                    
                </div>
            </div>
            </div>
            
            <motion.div  className={`${isOpen? "block":"hidden"} `+ "w-full h-fit py-1 pl-[10px]"}>
                {self.geometries ? (
                    <div className="flex items-center justify-start w-full h-fit border-l-2 border-black">
                        <div className="w-full h-fit" >
                        {self.geometries.filter((geo) => geo instanceof Group).map((childGeo, index) => {
                            return (
                                <div key={index} className="w-full h-fit">
                                    <ParentComponent self={childGeo} parentIsShow={isShow}/>
                                </div>
                            )
                        })}
                    </div>
                    </div>

                ): <></>
                }
                {self.geometries ? (
                    <div className="flex items-center justify-start w-full h-fit border-l-2 border-black">
                        <div className="w-full h-fit" >
                        {self.geometries.filter((geo) => geo instanceof Geometry).map((childGeometry, index) => {
                            return (
                                <div key={index} className="w-full h-fit">
                                    <GeometryComponent self={childGeometry} parentIsShow={isShow}/>
                                </div>
                            )
                        })}
                    </div>
                    </div>

                ): <></>
                }


            </motion.div>
        </div>
    );

};



export default ParentComponent;