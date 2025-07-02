import { Request, Response, NextFunction } from "express";

export const log = (req: Request, _res: Response, next: NextFunction): void => {
  console.log("--------------- Request Log ---------------");
  console.log("URL: ", req.url);
  console.log("METHOD: ", req.method);

  let payload: any = req.body;

  if (typeof req.body.payload_json === "string") {
    try {
      payload = JSON.parse(req.body.payload_json);
    } catch (e) {
      console.warn("Failed to parse payload_json:", e);
    }
  }

  const command = payload?.action?.command || payload?.command;
  if (command) console.log("COMMAND:", command);

  console.log("HEADERS: ", req.headers);
  console.log("BODY: ", req.body);

  const additionalValues = req.body?.action?.parameters?.additional_game_values;
  if (additionalValues) {
    console.log("Additional Game Values:", additionalValues);
  }

  console.log("--------------- EOL ---------------");

  next();
};
