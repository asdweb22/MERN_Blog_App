import express from "express"
import {getAllUsers,signUpUser,loginUser, getUserByBlogs} from "../controller/user-controller.js"

//router object
const router=express.Router();

//get all users || GET
router.get("/getAllUsers",getAllUsers)

//Create User || POST
router.post("/signUpUser",signUpUser)

//Login User || POST
router.post("/loginUser",loginUser)

//Get blogs by user id || GET
router.get("/blogsByUserId/:id",getUserByBlogs) 

export default router

