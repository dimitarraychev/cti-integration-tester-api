export interface BasePayload {
  command: string;
  amount?: number;
  bet_amount?: number;
  win_amount?: number;
  command_to_fail?: string;
}

export interface BaseResponse {
  currency: string;
  response_message: string;
  response_code: string;
  totalbalance: number;
  freeround_limit: number;
}
