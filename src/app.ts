import express, { Express } from "express";
import cors from "cors";

import { log } from "./middlewares/log.js";
import baseController from "./controllers/baseController.js";
import iSoftBetController from "./controllers/iSoftBetController.js";
import softswissV2Controller from "./controllers/softswissV2Controller.js";

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-request-sign"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(log);

app.use("/base", baseController);
app.use("/isoftbet", iSoftBetController);
app.use("/softswissv2", softswissV2Controller);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
