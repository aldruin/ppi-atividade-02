import express from "express";
import pacotesRouter from "./routes/pacotes.js";



const app = express();

app.use(express.json());

app.use("/pacotes", pacotesRouter);

export default app;