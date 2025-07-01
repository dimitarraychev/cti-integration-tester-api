import { Request, Response } from "express";
import { BasePayload, BaseResponse } from "../types/baseTypes";

let balance = 123456;
let simulateError = false;
let commandToFail = "";
const errorResponseMessage = "temporary_error";

const response: BaseResponse = {
  currency: "EUR",
  response_message: "ok",
  response_code: "ok",
  totalbalance: balance,
};

const resetResponse = () => {
  response.response_code = "ok";
  simulateError = false;
  commandToFail = "";
};

export const baseController = (req: Request, res: Response): void => {
  try {
    const payload: BasePayload = req.body.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const {
      command,
      amount = 0,
      bet_amount = 0,
      win_amount = 0,
      command_to_fail,
    } = payload;

    switch (command) {
      case "simulate_error":
        simulateError = true;
        commandToFail = command_to_fail || "";
        break;

      case "get_account_balance":
        response.totalbalance = balance;
        break;

      case "add_account_game_bet":
        balance -= amount;
        response.totalbalance = balance;
        break;

      case "add_account_game_win":
        balance += amount;
        response.totalbalance = balance;
        break;

      case "add_account_game_bet_and_win":
        balance -= bet_amount;
        balance += win_amount;
        response.totalbalance = balance;
        break;

      case "cancel":
        balance += amount;
        response.totalbalance = balance;
        break;

      default:
        console.log("Unknown command received:", command);
        res.status(400).json({ message: "Unknown command" });
        return;
    }

    response.response_code =
      simulateError && commandToFail === command ? errorResponseMessage : "ok";

    res.json(response);

    if (simulateError && commandToFail === command) {
      resetResponse();
    }
  } catch (error) {
    console.error("Base API Error:", error);
    res.status(400).json({ message: "Invalid JSON format" });
  }
};
