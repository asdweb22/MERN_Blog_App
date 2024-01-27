import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateBlog() {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/create-blog",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        alert("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
            Create Blog
          </Typography>
          <TextField
            placeholder="Enter title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="mt-3"
            type="text"
            required
          />
          <TextField
            placeholder="Enter description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            className="mt-3"
            type="text"
            required
          />
          <TextField
            placeholder="provide image link"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            className="mt-3"
            type="text"
            required
          />

          <Button type="submit" variant="contained" className="mt-4 shadow">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default CreateBlog;
