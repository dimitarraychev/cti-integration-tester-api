import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    let dataToValidate;

    if (typeof req.body.payload_json === "string") {
      try {
        dataToValidate = JSON.parse(req.body.payload_json);
      } catch {
        res.status(400).json({
          message: "Invalid JSON in payload_json",
        });
        return;
      }
    } else {
      dataToValidate = req.body;
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      res.status(400).json({
        message: "Validation error",
        errors: result.error.flatten(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
