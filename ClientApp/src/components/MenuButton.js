import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MenuButton = ({ activePage,icon, onClick, order, color, hoverColor }) => {

    const activeColor = "#FFFFFF";
    const isActive = order === activePage;
    const isBottom = order === activePage + 1;
    const isTop = order === activePage - 1;
    
    return (<motion.div 
    initial={{ x: 0, borderRadius:"0%", backgroundColor: color}}
    animate={{ 
        backgroundColor: isActive ? activeColor : color,
        borderTopRightRadius: isBottom ? '50%' : '0%',
        borderBottomRightRadius: isTop ? '50%' : '0%'
    }}
    whileHover= {{ backgroundColor : isActive? activeColor : hoverColor }}
    transition={{ type: "linear", duration: 0.1 }}
    onClick={onClick} 
    className="w-full h-full flex items-center justify-center">
        {
            icon ? <FontAwesomeIcon icon={icon} className="text-[20px]"/>: <div></div>
        }
        
    </motion.div>)
};


export default MenuButton;