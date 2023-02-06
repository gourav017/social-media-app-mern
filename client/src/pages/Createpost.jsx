import { Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Createpost = () => {
    const auth = useContext(AuthContext);

  const [postData, setPostData] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    let { title, body, photo } = postData;

    if (title === undefined || title.trim().length === 0) {
      alert("please fill the title of the post");
    } else if (body === "") {
      alert("please fill the caption");
    } else if (photo === undefined ) {
      alert("please fill the photo");
    } else {
      fetch("http://localhost:8080/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          alert("posted your post sucessfull");
          auth.handleLogin(data.token);
          navigate("/dashbord");
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("post failed");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "30%", margin: "auto" }}>
      <Heading as="h2" size="2xl">
        create post
      </Heading>
      <FormLabel>title</FormLabel>
      <Input
        type="text"
        name="title"
        id=""
        placeholder="enter  title.."
        onChange={handleChange}
      />
      <br />
      <FormLabel>body</FormLabel>
      <Input
        type="text"
        name="body"
        id=""
        placeholder="enter caption.."
        onChange={handleChange}
      />
      <br />
      <FormLabel>photo</FormLabel>

      <Input
        type="file"
        name="photo"
        placeholder="upload pic"
        onChange={handleChange}
      />
      <br />
      <Button type="submit" colorScheme="teal" size="lg">
        Submit
      </Button>
    </form>
  );
};

export default Createpost;
