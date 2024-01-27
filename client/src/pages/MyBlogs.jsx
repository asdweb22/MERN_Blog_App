import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Box, Typography } from "@mui/material";

function MyBlogs() {
  const [blogs, setblogs] = useState([]);

  //get user Blogs
  const UserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/blogsByUserId/${id}`
      );
      if (data?.success) {
        console.log("Login User Blogs data:", data.userblogs.blogs);
        setblogs(data?.userblogs.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    UserBlogs();
  }, []);

  return (
    <>
      <div className="container bg-light shadow mt-3">
        <Box className="mt-3">
          <Typography variant="h4">My Blogs</Typography>
        </Box>
        <div className="row mt-3 mb-3 py-3 px-3">
          {blogs && blogs.length ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="col-md-4 col-lg-3 col-sm-4 col-xs-12"
              >
                <BlogCard
                  id={blog._id}
                  isUser={localStorage.getItem("userId") == blog.user}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog?.createdAt}
                />
              </div>
            ))
          ) : (
            <p className="text-center py-3 px-3 ">
              {" "}
              <b>No blogs Created yet</b>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyBlogs;
