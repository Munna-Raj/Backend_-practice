import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import KhaltiRoute from "./Route/khaltiRoute.js"; 

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/khalti", KhaltiRoute); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
