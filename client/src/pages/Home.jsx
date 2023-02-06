import { Button } from "@chakra-ui/react";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
    return (
    <>
    <Button onClick={() => navigate("/signup")} >Signup</Button>
    <Button  onClick={() => navigate("/login")}>login</Button>
    </>
  );
};

export default Home;
