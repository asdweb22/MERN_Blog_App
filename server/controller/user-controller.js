import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

//get all users
export const getAllUsers= async(req,res) =>{
   try {
      const allUsers=await userModel.find({})
      return res.status(200).send({
         success:true,
         message:"All users data",
         usersCount:allUsers.length,
         allUsers
      })
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"Error in getallusers callback",success:false,error})
   }
}

//register user
export const signUpUser = async(req,res) =>{
   try {
      const {name,username,email,password} =req.body
      
      //validation
      if(!name || !username || !email ||!password)
      {
         return res.status(400).send({success:false,message:"please fill all fields"})
      }

      //existing User
      const existingUser=await userModel.findOne({email})
      if(existingUser)
      {
         return res.status(401).send({success:false,message:"User already exist",error})
      }

      //password hashing
      const hashedPassword=await bcrypt.hash(password,10)

      //save new user
      const user=new userModel({name,username,email,password:hashedPassword})
      await user.save()
      return res.status(201).send({success:true,message:"User created",UserData:user})
      
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"Error in signup callback",success:false,error})
   }
}

//login user
export const loginUser = async(req,res) =>{
   try {
      const {email,password}=req.body

      //validation
      if(!email|| !password){
         return res.status(401).send({success:false,message:"please provide email or password",error})
      }
      const user=await userModel.findOne({email})
      if(!user)
      {
         return res.status(200).send({
            success:false,
            message:"User not signup",
            error
         })
      }

      //if user exist then check password
      const ismatch=await bcrypt.compare(password,user.password)
      if(!ismatch)
      {
        return  res.status(401).send({
            success:false,
            message:"invalid username or password"
         })
      }

      return res.status(200).send({
         success:true,
         message:"Login successfully",
         user
      })
      
   } catch (error) {
      console.log(error)
      return res.status(500).send({success:false,message:"error in while login",error})
   }
}

//get user by blogs
export const getUserByBlogs =async(req,res)=>{
   try {
      const userblogs=await userModel.findById(req.params.id).populate("blogs")
      if(!userblogs){
         return res.status(401).send({success:false,message:"Users blogs not found"})
      }      

      return res.status(200).send({success:true,message:"user Blogs found",Total_User_blogs:userblogs.blogs.length,userblogs})
   } catch (error) {
      console.log(error)
      return res.status(500).send({success:false,message:"error while retriving users blogs"})
   }
}