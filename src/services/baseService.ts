import { Request, Response } from "express";
import { BasePayload, BaseResponse } from "../types/baseTypes.js";
import { applyCommandEffects } from "../utils/baseCommands.js";
import { logResponse } from "../utils/responseLogger.js";

let balance = 123456;

let pendingFailure: {
  command: string;
  account_id: string;
  code: string;
  message?: string;
} | null = null;

const createBaseResponse = (): BaseResponse => ({
  currency: "EUR",
  response_message: "ok",
  response_code: "ok",
  totalbalance: balance,
});

export const baseService = (req: Request, res: Response): void => {
  try {
    const payload: BasePayload = req.body?.payload_json
      ? JSON.parse(req.body.payload_json)
      : req.body;

    const { command, command_to_fail, account_id, error_code, error_message, is_freeround } =
      payload || {};

    if (!command || typeof command !== "string") {
      res.status(400).json({ message: "Missing or invalid 'command' field" });
      return;
    }

    if (command === "simulate_error") {
      if (
        !command_to_fail ||
        typeof command_to_fail !== "string" ||
        !account_id
      ) {
        console.log(payload);

        res.status(400).json({
          message: "Missing 'command_to_fail' or 'id' for simulate_error",
        });
        return;
      }
      pendingFailure = {
        command: command_to_fail,
        account_id,
        code: error_code || "temporary_error",
        message: error_message || "Simulated error",
      };

      const ack: BaseResponse = {
        ...createBaseResponse(),
        response_message: `Next '${command_to_fail}' for account '${account_id}' will return error '${pendingFailure.code}'.`,
      };

      logResponse(ack);
      res.json(ack);
      return;
    }

    const response = createBaseResponse();

    if (
      pendingFailure &&
      pendingFailure.command === command &&
      pendingFailure.account_id === account_id
    ) {
      response.response_code = pendingFailure.code;
      response.response_message = pendingFailure.message || pendingFailure.code;

      pendingFailure = null;

      logResponse(response);
      res.json(response);
      return;
    }

    const result = applyCommandEffects(command, payload, balance);
    balance = result.balance;

    if (!result.ok) {
      res.status(400).json({ message: result.message || "Unknown command" });
      return;
    }

    logResponse(response);
    res.json(response);
  } catch (err) {
    console.error("Base API Error:", err);
    res.status(400).json({ message: "Invalid JSON format or payload" });
  }
};
