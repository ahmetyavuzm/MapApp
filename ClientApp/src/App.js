import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./custom.css";
import HomeLayout from "./layouts/HomeLayout";
import { Home } from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import RootLayout from "./layouts/RootLayout";
import SignLayout from "./layouts/SignLayout";
import ForgotPasswordPage from "./pages/Forgot";
import MapAppLayout from "./layouts/MapAppLayout";
import Layers from "./pages/menu/Layers";
import AddGeometry from "./pages/menu/AddGeometry";
import UpdateGeometry from "./pages/menu/UpdateGeometry";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route element={<SignLayout />}>
                <Route path="/signIn/forgot" element={<ForgotPasswordPage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/signUp" element={<SignUpPage />} />
              </Route>
            </Route>
              <Route path="/mapApp/:uid" element={<MapAppLayout />} >
                <Route index element={<div></div>} />
                <Route path="layers" element={<Layers/>} />
                <Route path="addgeometry" element={<AddGeometry/>}/>
                <Route path="editgeometry" element={<UpdateGeometry/>}/>
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

/*


*/
