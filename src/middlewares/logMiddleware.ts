import { Request, Response, NextFunction } from "express";

export const logMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.log("--------------- Request Log ---------------");
  console.log("URL: ", req.url);
  console.log("METHOD: ", req.method);
  console.log("HEADERS: ", req.headers);
  console.log("BODY: ", req.body);

  // Optional: Custom logs for certain payload types
  const command = req.body?.action?.command || req.body?.command;
  if (command) {
    console.log("Detected Command:", command);
  }

  const additionalValues = req.body?.action?.parameters?.additional_game_values;
  if (additionalValues) {
    console.log("Additional Game Values:", additionalValues);
  }

  console.log("--------------- EOL ---------------");

  next();
};
