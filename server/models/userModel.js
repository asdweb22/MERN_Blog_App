import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        },
        username:{
            type:String,
            unique:true,
            required:[true,"username is required"]
        },
        email:{
            type:String,
            unique:true,
            required:[true,"email id is required"]
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        blogs:[
            {type:mongoose.Types.ObjectId,ref:"blog"}
        ]
    },
    {
        timestamps:true
    }
)


const userModel=mongoose.model("user",userSchema)

export default userModel
