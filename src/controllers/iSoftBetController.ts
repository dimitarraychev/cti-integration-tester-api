import express from "express";
import { iSoftBetService } from "../services/iSoftBetService.js";
// import { validate } from "../middlewares/validate.js";
// import { iSoftBetSchema } from "../schemas/iSoftBetSchema.js";

const router = express.Router();

// Single entry point
router.post("/", iSoftBetService);

export default router;
