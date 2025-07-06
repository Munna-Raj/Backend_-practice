import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/mongodb.js";


dotenv.config();

connectDB();         // mongoDB

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());



app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
    console.log(`Backend URI: ${process.env.BACKEND_URI}`);
});