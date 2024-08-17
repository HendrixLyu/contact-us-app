import express from "express";
import cors from "cors";
import "dotenv/config";
import apiRouter from './routes/api.js'

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT} !`));
