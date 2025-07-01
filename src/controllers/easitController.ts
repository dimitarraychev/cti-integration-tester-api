import express, { Request, Response, Router } from "express";
import crypto from "crypto";

const router: Router = express.Router();

let balance = 1234567;

router.get("/session", (_req: Request, res: Response) => {
  const sessionRes = {
    playerId: 1234,
    gameId: "1000",
    currency: "EUR",
    token: crypto.randomUUID(),
  };

  res.send(sessionRes);
});

router.get("/balance", (_req: Request, res: Response) => {
  res.send({ balance });
});

router.post("/bet", (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const transactionId = crypto.randomUUID();
  balance -= amount;
  res.json({ balance, transactionId });
});

router.post("/win", (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.json({ balance, transactionId });
});

router.post("/jackpotwin", (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.json({ balance, transactionId });
});

router.post("/refund", (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const transactionId = crypto.randomUUID();
  balance += amount;
  res.json({ balance, transactionId });
});

export default router;
