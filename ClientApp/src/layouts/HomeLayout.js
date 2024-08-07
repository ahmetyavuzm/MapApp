import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {    
    return (
      <div className="relative w-full h-full z-0 p-10 flex items-center justify-center">
        <div className="fixed -z-10 inset-0 overflow-hidden">
          <video className="min-w-screen min-h-screen object-cover" autoPlay loop muted playsInline>
            <source src="videos/global_network.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="w-full h-full">
          <Outlet/>
        </div>
      
    </div>
    );
}

export default HomeLayout;
