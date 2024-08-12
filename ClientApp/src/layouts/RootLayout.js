import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { MapProvider } from "../contexts/MapContext";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <MapProvider>
        <ToastContainer/>
          <Outlet />
        </MapProvider>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
