import mongoose from "mongoose";
import dotenv from "dotenv";

// dotenv.config();

const connectDB= async()=>{

    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb Database connected successfully")
    }
    catch(error){
        console.log("Error while connecting Database ",error)
    }
}

export default connectDB