import { Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const auth = useContext(AuthContext);

  const [logincreds, setlogincreds] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setlogincreds({
      ...logincreds,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    let { email, password } = logincreds;

    if (email === "") {
      alert("please fill the email");
    } else if (password === undefined || password.trim().length === 0) {
      alert("please fill the password");
    } else if (!email.includes("@")) {
      alert("includes @ in your email!");
    } else if (password.length < 6) {
      alert("password length not less than 6");
    }
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logincreds),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        if (res.userId) {
          localStorage.setItem("userId", res.userId);
        }

        alert("login sucessfull");
        auth.handleLogin(res.token);
        navigate("/dashbord");
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("invalid credincial! try later");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "30%", margin: "auto" }}>
      <Heading as="h2" size="2xl">
        login page
      </Heading>
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
        type="text"
        name="password"
        placeholder="enter password"
        onChange={handleChange}
      />
      <br />
      <Button type="submit" colorScheme="teal" size="lg">
        Submit
      </Button>

      <Button onClick={() => navigate("/Applytorestpass")}>
        forgot passsword click here
      </Button>
    </form>
  );
};

export default Login;
