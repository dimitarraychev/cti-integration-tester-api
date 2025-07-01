import { Request } from "express";

export const generateLogsBase = (
  headers: Record<string, string | string[] | undefined>,
  payload: any,
  command: string,
  simulateError: boolean,
  commandToFail: string,
  response: any
): void => {
  console.log("Headers: ", headers);
  console.log(`Received Command: ${command}`);
  console.log("Payload:");
  console.log(payload);
  console.log("Simulation status:");
  console.log(simulateError, commandToFail);
  console.log("Response:");
  console.log(response);
  console.log("EOL---------------------------------------------");
};

export const generateLogsSoftSwissV2 = (req: Request): void => {
  console.log("URL:");
  console.log(req.url);
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);
  console.log("EOL----------------------------------");
};

export const generateLogsISoftBet = (req: Request): void => {
  console.log("URL:");
  console.log(req.url);
  console.log("Headers:");
  console.log(req.headers);
  console.log("Body:");
  console.log(req.body);
  console.log("Additional Game Values:");
  console.log(
    req.body?.action?.parameters?.additional_game_values || "Not present"
  );
  console.log("EOL----------------------------------");
};
