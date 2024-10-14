import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/userRoutes.js";
import cookieParser from 'cookie-parser';

const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',  
    credentials: true,               })
);

app.use("/api", router);

// Define the port to listen on, default to 3000 if not defined in .env
const port = process.env.PORT || 3000;

// Basic route to test server
app.get('/', (req, res) => {
    res.send("yes");
});

// MongoDB connection URL from environment variables
const url = process.env.URL;
if (!url) {
    console.error("MongoDB URL is missing from environment variables.");
    process.exit(1); // Exit if no URL is provided
}

// Connect to MongoDB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if MongoDB connection fails
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
