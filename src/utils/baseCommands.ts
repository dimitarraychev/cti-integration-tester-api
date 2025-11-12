import { BasePayload } from "../types/baseTypes.js";

export const applyCommandEffects = (
  command: string,
  payload: BasePayload,
  balance: number
): { balance: number; ok: boolean; message?: string } => {
  const {
    amount = 0,
    bet_amount = 0,
    win_amount = 0,
    is_freeround = 0,
  } = payload;

  switch (command) {
    case "get_account_balance":
      return { balance, ok: true };
    case "add_account_game_bet":
      return is_freeround === 1
        ? { balance, ok: true }
        : { balance: balance - amount, ok: true };
    case "add_account_game_win":
      return { balance: balance + amount, ok: true };
    case "add_account_game_bet_and_win":
      return is_freeround === 1
        ? { balance: balance + win_amount, ok: true }
        : { balance: balance - bet_amount + win_amount, ok: true };
    case "cancel":
      return { balance: balance + amount, ok: true };
    default:
      return { balance, ok: false, message: "Unknown command" };
  }
};
