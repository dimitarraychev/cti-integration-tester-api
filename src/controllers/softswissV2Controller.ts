import express from "express";
import { generateSoftswissLaunchURL } from "../services/softswissV2Service.js";

const router = express.Router();

router.post("/launch", generateSoftswissLaunchURL);

export default router;
