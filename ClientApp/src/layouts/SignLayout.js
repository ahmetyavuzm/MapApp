import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from 'react';
import AuthService from '../services/AuthService';
import {useNavigate} from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";


const SignLayout = () => {
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();
    React.useEffect(() => {
        if(currentUser){
            navigate("/mapApp/" + currentUser.uid);
        }
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <NavLink to="/" className="text-white text-[100px] mt-[100px] drop-shadow-[0px_0px_8px_#13bbf2] font-semibold">Map App</NavLink>
            <div className="w-11/12 md:w-1/2">
                <Outlet/>
            </div>
        </div>
        
    );


};



export default SignLayout;