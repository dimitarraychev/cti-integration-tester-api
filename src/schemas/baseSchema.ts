import { z } from "zod";

export const simulateErrorSchema = z.object({
  command: z.literal("simulate_error"),
  command_to_fail: z.string().optional(),
});

export const getAccountBalanceSchema = z.object({
  command: z.literal("get_account_balance"),
  command_to_fail: z.string().optional(),
});

export const addGameBetSchema = z.object({
  command: z.literal("add_account_game_bet"),
  amount: z.number(),
  command_to_fail: z.string().optional(),
});

export const addGameWinSchema = z.object({
  command: z.literal("add_account_game_win"),
  amount: z.number(),
  command_to_fail: z.string().optional(),
});

export const betAndWinSchema = z.object({
  command: z.literal("add_account_game_bet_and_win"),
  bet_amount: z.number(),
  win_amount: z.number(),
  command_to_fail: z.string().optional(),
});

export const cancelSchema = z.object({
  command: z.literal("cancel"),
  amount: z.number(),
  command_to_fail: z.string().optional(),
});

// Union all command schemas into one
export const basePayloadSchema = z.union([
  simulateErrorSchema,
  getAccountBalanceSchema,
  addGameBetSchema,
  addGameWinSchema,
  betAndWinSchema,
  cancelSchema,
]);

export type BasePayload = z.infer<typeof basePayloadSchema>;
