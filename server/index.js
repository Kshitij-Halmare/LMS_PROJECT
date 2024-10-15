import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/userRoutes.js"; // Ensure the correct path to the router
import cookieParser from 'cookie-parser';
import teacherRouter from "./Routes/teacherAuthen.js";
const app = express();

dotenv.config();
// app.options('*', cors()); // Allow preflight requests for all routes
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:5173',  // Allow only your React app's origin
      credentials: true,               // Allow cookies and authentication tokens
    })
  );
  
  
  

app.use("/api", router);  // This adds the "/api" prefix to all routes in userRoutes.js
app.use("/",teacherRouter);

// MongoDB connection and server start logic
const port = process.env.PORT || 3000;
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Database Connected");
})
.catch((err) => {
  console.error("Database connection error:", err);
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
