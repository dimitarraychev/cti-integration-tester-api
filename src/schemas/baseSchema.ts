import { z } from "zod";

const baseSchema = {
  account_id: z.string(),
  token_id: z.string(),
  icasino_token_id: z.string(),
  currency: z.string(),
  is_session_demo: z.union([z.literal(0), z.literal(1)]),
  game_id: z.number(),
  game_id_string: z.string(),
  session_data: z.string().nullable().optional(),
};

const transactionSchema = {
  jp_system_ids: z.array(z.string()).optional(),
  description: z.string(),
  game: z.string(),
  transaction_id: z.string(),
  session_id: z.string(),
  gameplay_id: z.string(),
  slot_lines: z.number().nullable().optional(),
  is_freeround: z.union([z.literal(0), z.literal(1)]),
  freeround_campaign_id: z.number().optional(),
  freeround_promotion_id: z.number().optional(),
  multiple_bet: z.union([z.literal(0), z.literal(1)]),
};

const betDescriptionSchema = z.object({
  ticket_odds: z.number().optional(),
  buy_bonus: z.boolean().optional(),
});

const simulateErrorSchema = z.object({
  command: z.literal("simulate_error"),
  command_to_fail: z.string(),
});

const getAccountBalanceSchema = z.object({
  ...baseSchema,
  command: z.literal("get_account_balance"),
});

const addAccountGameBetSchema = z.object({
  ...baseSchema,
  ...transactionSchema,
  command: z.literal("add_account_game_bet"),
  amount: z.number(),
  jp_contribution_amount: z.number().optional(),
  description_json: betDescriptionSchema.optional(),
  round_data_json: betDescriptionSchema.optional(),
});

const addAccountGameWinSchema = z.object({
  ...baseSchema,
  ...transactionSchema,
  amount: z.number(),
  command: z.literal("add_account_game_win"),
  without_jp_amount: z.number(),
  jp_amount: z.number().optional(),
  jp_level: z.enum(["0", "1", "2", "3"]).optional(),
  jp_hit_id: z.string().optional(),
  free_games_total_win_amount: z.number(),
  free_games_total_count: z.number(),
  double_bet_amount: z.number(),
  double_win_amount: z.number(),
  double_count: z.number(),
  base_game_total_win_amount: z.number(),
  bet_amount: z.number(),
});

const addAccountBetAndWinSchema = z.object({
  ...baseSchema,
  ...transactionSchema,
  command: z.literal("add_account_game_bet_and_win"),
  bet_amount: z.number(),
  win_amount: z.number(),
  win_without_jp_amount: z.number(),
  jp_amount: z.number().optional(),
  jp_level: z.enum(["0", "1", "2", "3"]).optional(),
  jp_hit_id: z.string().optional(),
  free_games_total_win_amount: z.number(),
  free_games_total_count: z.number(),
  double_bet_amount: z.number(),
  double_win_amount: z.number(),
  double_count: z.number(),
  base_game_total_win_amount: z.number(),
  description_json: betDescriptionSchema.optional(),
  round_data_json: betDescriptionSchema.optional(),
});

const cancelSchema = z.object({
  ...baseSchema,
  ...transactionSchema,
  command: z.literal("cancel"),
  amount: z.number(),
  cancel_whole_gameplay: z.boolean(),
  description_json: betDescriptionSchema.optional(),
  round_data_json: betDescriptionSchema.optional(),
});

// Union all command schemas into one
export const basePayloadSchema = z.union([
  simulateErrorSchema,
  getAccountBalanceSchema,
  addAccountGameBetSchema,
  addAccountGameWinSchema,
  addAccountBetAndWinSchema,
  cancelSchema,
]);

export type BasePayload = z.infer<typeof basePayloadSchema>;
