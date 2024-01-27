import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
