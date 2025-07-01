import express, { Express } from "express";
import cors from "cors";

// import unifiedRouter from './api/router';
// import softSwissV2Api from './api/softSwissV2';
// import easitRouter from './api/easit';

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', unifiedRouter); // handles both base and iSoftBet
// app.use('/', easitRouter);
// app.use('/v2/provider_a8r.:subroute(*)', softSwissV2Api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
