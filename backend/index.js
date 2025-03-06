import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';

import userRoutes from './routes/userRoute.js';
import gameRoutes from './routes/gameRoute.js';
import reviewRoutes from './routes/reviewRoute.js';


dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Port:", process.env.PORT);
const app = express();

// Middleware function that runs before you send response back to client
app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/", (req, res) => {
    res.send("hi");
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

// Connect to database
app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + process.env.PORT);
});