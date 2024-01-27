import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const getblogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.singleBlog);
        setInputs({
          title: data?.singleBlog.title,
          description: data?.singleBlog.description,
          image: data?.singleBlog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getblogDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          //   user: id,
        }
      );
      if (data?.success) {
        alert("Blog updated");
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
            Edit Blog
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

          <Button
            type="submit"
            color="warning"
            variant="contained"
            className="mt-4 shadow"
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
}

export default BlogDetails;
