import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controller/blog-controller.js"


const router=express.Router()

//routes

//GET || All blogs
router.get("/get-all-blogs",getAllBlogs)

//POST || create a Blog
router.post("/create-blog",createBlog)

//PUT || Update Blog
router.put("/update-blog/:id",updateBlog)

//GET || Single blog
router.get("/get-blog/:id",getBlogById)

//DELETE || Delete blog
router.delete("/delete-blog/:id",deleteBlog)

export default router