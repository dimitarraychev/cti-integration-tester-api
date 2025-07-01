import express from "express";
import { baseController } from "../controllers/baseController.js";
import { validate } from "../middlewares/validate.js";
import { basePayloadSchema } from "../schemas/baseSchema.js";

const router = express.Router();

router.post("/", validate(basePayloadSchema), baseController);

export default router;
