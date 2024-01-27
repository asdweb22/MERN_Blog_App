import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Typography } from "@mui/material";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  //get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/blog/get-all-blogs"
      );
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="container">
        <Box className="mt-3">
          <Typography variant="h4">All Blogs</Typography>
        </Box>
        <div className="row mt-3 mb-3 py-3 px-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="col-md-4 col-lg-3 col-sm-4 col-xs-12"
            >
              <BlogCard
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
