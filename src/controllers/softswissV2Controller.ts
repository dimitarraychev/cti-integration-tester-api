import express from "express";
import {
  generateSoftswissLaunchURL,
  softswissV2Service,
} from "../services/softswissV2Service.js";

const router = express.Router();

router.post("/", softswissV2Service);
router.post("/launch", generateSoftswissLaunchURL);

export default router;
