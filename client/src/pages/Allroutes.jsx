import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashbord from "./Dashbord";
import PrivateRoute from "../components/PrivateRoute";
import Createpost from "./Createpost";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashbord" element={<PrivateRoute><Dashbord/></PrivateRoute>} />
      <Route path="/createpost" element={<Createpost/>} />
    </Routes>
  );
};

export default Allroutes;
