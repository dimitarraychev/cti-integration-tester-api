import { Request, Response } from "express";
import { ISoftBetPayload, ISoftBetResponse } from "../types/iSoftBetTypes.js";

let totalBalance = 123456;

const response: ISoftBetResponse = {
  status: "success",
  currency: "EUR",
};

export const iSoftBetController = (req: Request, res: Response): void => {
  try {
    const payload: ISoftBetPayload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    if (payload.action) {
      const { command, parameters } = payload.action;

      switch (command) {
        case "initsession":
          res.json({
            ...response,
            sessionid: "LRzyoAhcB0za3B3HcBJayvk57OqF1YUd",
            playerid: payload.playerid,
            username: payload.username,
            balance: totalBalance,
          });
          return;

        case "bet":
          totalBalance -= parameters.amount ?? 0;
          res.json({ ...response, balance: totalBalance });
          return;

        case "win":
          totalBalance += parameters.amount ?? 0;
          res.json({ ...response, balance: totalBalance });
          return;

        case "balance":
        case "cancel":
        case "end":
        case "depositmoney":
          res.json({ ...response, balance: totalBalance });
          return;

        default:
          res.status(400).json({ message: "Unknown iSoftBet command" });
          return;
      }
    }

    if (Array.isArray(payload.actions)) {
      for (const action of payload.actions) {
        const { command, parameters } = action;

        if (command === "bet") {
          totalBalance -= parameters.amount ?? 0;
        } else if (command === "win") {
          totalBalance += parameters.amount ?? 0;
        } else {
          console.warn("Unknown command in batch:", command);
        }
      }

      res.json({ ...response, balance: totalBalance });
      return;
    }

    res.status(400).json({ message: "No recognizable action(s) provided" });
  } catch (err) {
    console.error("iSoftBet handler error:", err);
    res.status(400).json({ message: "Invalid iSoftBet format" });
  }
};
