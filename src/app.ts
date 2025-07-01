import express, { Express } from "express";
import cors from "cors";

import router from './routes';
import easitRouter from './controllers/easitController';

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router); // handles both base and iSoftBet
app.use('/', easitRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
