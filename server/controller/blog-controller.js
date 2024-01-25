import mongoose  from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

export const getAllBlogs = async(req,res)=>{
    try {
        const blogs=await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No blog found"
            })
        }
        return res.status(200).send({success:true,total_Blogs:blogs.length,message:"All Blogs list",blogs})
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while getting all blogs data",
            error
        })
    }
}

export const createBlog =async(req,res)=>{
    try {
        const {title,description,image,user}=req.body

        //validation
        if(!title || !description || !image || !user)
        {
            return res.status(400).send({success:false,message:"please fill all the values"},error)
        }

        //user table relationship
        const existingUser= await userModel.findById(user)

        //validation 
        if(!existingUser)
        {
            return res.status(404).send({success:false,message:"user not found"})
        }
        
        const newblog=new blogModel({title,description,image,user})
        const session=await mongoose.startSession()
        session.startTransaction()
        await newblog.save({session})
        existingUser.blogs.push(newblog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newblog.save()
        return res.status(201).send({success:true,message:"New blog created",newblog})
         
    } catch (error) {
        console.log(error)
        return res.status(400).send({success:false,message:"error while creating blog",error})
    }
}

export const updateBlog = async(req,res) =>{
    try {
        const {id}=req.params;
        const {title,description,image}=req.body

        const updatedBlog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"Blog Updated successfully",
            updatedBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"error while updating blog",
            error
        })
    }
}

export const getBlogById =async(req,res) =>{
    try {
        const {id}=req.params
        const singleBlog=await blogModel.findById(id)
        if(!singleBlog)
        {
            return res.status(404).send({success:false, message:"blog can not found"})
        }

        return res.status(200).send({success:true,message:"Blog found Successfully",singleBlog})
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false, message:"error while finding single blog",error
        })
    }
}

export const deleteBlog = async(req,res) =>{
    try {
        const blog=await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({success:true,message:"blog deleted successfully"})

    } catch (error) {
        console.log(error)
        return res.status(400).send({success:false, message:"error while deleting blog ",error})
    }
}
