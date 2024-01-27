import express, { Router }  from "express";
import cors from "cors";
import connectDB from "./database/db.js";

import morgan from "morgan";
import dotenv from "dotenv";

//env config
dotenv.config()

//router import
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"

//mongodb connection
connectDB()

const app=express()

var corsOptions = {
    origin: 'http://localhost:5173',
    methods:"GET, POST,PUT,DELETE",
    credentials: true,
  }

// middlewares
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())


const PORT=process.env.PORT || 8080

//routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/blog",blogRoutes)

//listen
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))

