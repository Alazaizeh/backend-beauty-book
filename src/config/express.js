import express from "express";
 import corsOptions from './cors.js'
 import limiter from './limiter.js'
import cors from "cors";
const app = express();
app.use(cors())
app.use(limiter)
// Middleware
app.use(express.json());


export default app;