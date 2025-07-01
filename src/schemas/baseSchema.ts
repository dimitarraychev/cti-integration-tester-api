import { z } from "zod";

const baseFields = {
  account_id: z.string(),
  token_id: z.string(),
  icasino_token_id: z.string(),
  currency: z.string(),
  is_session_demo: z.union([z.literal(0), z.literal(1)]),
  game_id: z.number(),
  game_id_string: z.string(),
  session_data: z.string().nullable().optional(),
};

const betDescriptionSchema = z.object({
  ticket_odds: z.number().optional(),
  buy_bonus: z.boolean().optional(),
});
export const simulateErrorSchema = z.object({
  command: z.literal("simulate_error"),
  command_to_fail: z.string(),
});

export const getAccountBalanceSchema = z.object({
  ...baseFields,
  command: z.literal("get_account_balance"),
});

export const addAccountGameBetSchema = z.object({
  ...baseFields,
  command: z.literal("add_account_game_bet"),
  amount: z.number(),
  jp_contribution_amount: z.number().optional(),
  jp_system_ids: z.array(z.string()).optional(),
  description: z.string(),
  game: z.string(),
  transaction_id: z.string(),
  session_id: z.string(),
  gameplay_id: z.string(),
  multiple_bet: z.union([z.literal(0), z.literal(1)]),
  slot_lines: z.number().optional(),
  is_freeround: z.union([z.literal(0), z.literal(1)]),
  freeround_campaign_id: z.number().optional(),
  freeround_promotion_id: z.number().optional(),
  description_json: betDescriptionSchema.optional(),
  round_data_json: betDescriptionSchema.optional(),
});

export const addGameWinSchema = z.object({
  ...baseFields,
  command: z.literal("add_account_game_win"),
  amount: z.number(),
});

export const betAndWinSchema = z.object({
  ...baseFields,
  command: z.literal("add_account_game_bet_and_win"),
  bet_amount: z.number(),
  win_amount: z.number(),
});

export const cancelSchema = z.object({
  ...baseFields,
  command: z.literal("cancel"),
  amount: z.number(),
});

// Union all command schemas into one
export const basePayloadSchema = z.union([
  simulateErrorSchema,
  getAccountBalanceSchema,
  addAccountGameBetSchema,
  addGameWinSchema,
  betAndWinSchema,
  cancelSchema,
]);

export type BasePayload = z.infer<typeof basePayloadSchema>;
