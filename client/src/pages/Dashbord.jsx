import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashbord = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const getdata = async () => {
    await fetch(`http://localhost:8080/allpost`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.allpost);
        setData(data.allpost);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      Dashbord
      <Button onClick={() => navigate("/createpost")}>Create post</Button>
      {data.map((p) => (
        <>
          <h1>{p.title}</h1>
          <h3>{p.body}</h3>
          <img
            src="https://plus.unsplash.com/premium_photo-1663050844860-548dbfcc79a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
          <Button>like</Button>
          <Button>comment</Button>
        </>
      ))}
    </div>
  );
};

export default Dashbord;
