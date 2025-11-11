import express from "express";
import { iSoftBetService } from "../services/iSoftBetService.js";

const router = express.Router();

router.post("/", iSoftBetService);

export default router;
