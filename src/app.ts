import express, { Express } from "express";
import cors from "cors";

import { log } from "./middlewares/log.js";
import baseController from './controllers/baseController.js'

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(log);

app.use("/base", baseController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
