import { Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupcreds, setsignupcreds] = useState({});
  let navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setsignupcreds({
      ...signupcreds,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { first_name, email, password } = signupcreds;

    if (first_name === undefined || first_name.trim().length === 0) {
      alert("please fill the first name");
    } else if (email === "") {
      alert("please fill the email");
    } else if (password === undefined || password.trim().length === 0) {
      alert("please fill the password");
    } else if (!email.includes("@")) {
      alert("includes @ in your email!");
    } else if (password.length < 6) {
      alert("password length not less than 6");
    } else {
      fetch("http://localhost:8080/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupcreds),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          alert("signup sucessfull");
          navigate("/login");
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("signup failed");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "30%", margin: "auto" }}>
      <Heading as="h2" size="2xl">
        Signup page
      </Heading>
      <FormLabel>first name</FormLabel>
      <Input
        type="text"
        name="first_name"
        id=""
        placeholder="enter first name.."
        onChange={handleChange}
      />
      <br />
      <FormLabel>email</FormLabel>
      <Input
        type="email"
        name="email"
        id=""
        placeholder="enter email.."
        onChange={handleChange}
      />
      <br />
      <FormLabel>password</FormLabel>
      <Input
        type="password"
        name="password"
        placeholder="enter password"
        onChange={handleChange}
      />
      <br />
      <Button type="submit" colorScheme="teal" size="lg">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
