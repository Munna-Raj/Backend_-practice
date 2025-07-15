import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import KhaltiRoute from "./Route/khaltiRoute.js";
import AuthicationRoute from "./Route/AuthicationRoute.js";
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/khalti", KhaltiRoute);        // Khalti payment routes
app.use("/api/auth", AuthicationRoute);     // Auth routes (register, login)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
