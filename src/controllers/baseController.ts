import express from "express";
import { validate } from "../middlewares/validate.js";
import { basePayloadSchema } from "../schemas/baseSchema.js";
import { baseService } from "../services/baseService.js";

const router = express.Router();

router.post("/", validate(basePayloadSchema), baseService);

export default router;
