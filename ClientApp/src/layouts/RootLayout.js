import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { MapProvider } from "../contexts/MapContext";

const RootLayout = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <MapProvider>
          <Outlet />
        </MapProvider>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
