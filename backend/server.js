import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// start the Express server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port http://localhost:${PORT}`);
});