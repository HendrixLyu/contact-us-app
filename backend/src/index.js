import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import apiRouter from './routes/api.js'

const PORT = process.env.PORT || 4000;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/contactDB";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB !"))
.catch((error) => console.error("Failed to connect to MongoDB:", error));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT} !`));
