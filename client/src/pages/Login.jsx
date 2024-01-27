import { Box, TextField, Button, Typography } from "@mui/material";
import logo from "../assets/images/CreativeContent_logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputVals, setInputVals] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputVals);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/loginUser",
        {
          email: inputVals.email,
          password: inputVals.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        alert("User login successfully");
        navigate("/all-blogs");
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
            Login
          </Typography>

          <TextField
            placeholder="email"
            name="email"
            value={inputVals.email}
            onChange={handleChange}
            className="mt-3"
            type="text"
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
          <Button className="mt-3" LinkComponent={Link} to="/register">
            Create an account
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Login;
