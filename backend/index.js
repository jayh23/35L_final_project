import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

dotenv.config({ path: './config/.env' }); // Explicitly load .env from config folder

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is missing from .env file.");
  process.exit(1);
}

/*
const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("MongoDB connected!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  };
  */


// Middleware function that runs before you send response back to client
app.use(express.json()); // allows us to accept JSON data in the req.body



app.listen(process.env.PORT, async () => {
    connectDB();
    console.log("Server started at http://localhost:" + process.env.PORT);
});