import express from "express";
import { baseController } from "../controllers/baseController";
import { validate } from "../middlewares/validate";
import { basePayloadSchema } from "../schemas/baseSchema";

const router = express.Router();

router.post("/", validate(basePayloadSchema), baseController);

export default router;
