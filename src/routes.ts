import express, { Request, Response, Router } from "express";
import { baseController } from "./controllers/baseController";
import { iSoftBetController } from "./controllers/iSoftBetController";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const payload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    if (payload?.action?.command && payload?.ISBskinid) {
      return iSoftBetController(req, res);
    }

    return baseController(req, res);
  } catch (err) {
    console.error("Routing error:", err);
    res.status(400).json({ message: "Invalid request format" });
  }
});

export default router;
