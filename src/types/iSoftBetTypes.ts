interface ISoftBetActionParameters {
  amount?: number;
  // add more fields if needed
}

interface ISoftBetAction {
  command: string;
  parameters: ISoftBetActionParameters;
}

export interface ISoftBetPayload {
  payload_json?: string;
  playerid?: string;
  username?: string;
  action?: ISoftBetAction;
  actions?: ISoftBetAction[];
  // add more fields if needed
}

export interface ISoftBetResponse {
  status: string;
  currency: string;
  sessionid?: string;
  playerid?: string;
  username?: string;
  balance?: number;
}
