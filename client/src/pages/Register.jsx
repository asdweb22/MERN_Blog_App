import React, { useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [inputVals, setInputVals] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  //handle onchange values
  const handleChange = (e) => {
    setInputVals((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //onsubmit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputVals);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/signUpUser",
        {
          name: inputVals.name,
          username: inputVals.username,
          email: inputVals.email,
          password: inputVals.password,
        }
      );
      if (data.success) {
        toast.success("User Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin="auto"
          className="shadow mt-3 mb-3 rounded py-3 px-3 rounded"
        >
          <Typography
            variant="h4"
            textTransform={"uppercase"}
            className="py-3 px-3 text-center"
          >
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            value={inputVals.name}
            onChange={handleChange}
            className="mt-3"
            type="text"
            required
          />
          <TextField
            placeholder="username"
            name="username"
            value={inputVals.username}
            onChange={handleChange}
            className="mt-3"
            type="text"
            required
          />
          <TextField
            placeholder="email"
            name="email"
            value={inputVals.email}
            onChange={handleChange}
            className="mt-3"
            type="email"
            required
          />
          <TextField
            placeholder="password"
            name="password"
            value={inputVals.password}
            onChange={handleChange}
            className="mt-3"
            type="password"
            required
          />

          <Button type="submit" variant="contained" className="mt-4 shadow">
            Submit
          </Button>
          <Button className="mt-3" LinkComponent={Link} to="/login">
            Alreadt Register ? Please Login
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;
