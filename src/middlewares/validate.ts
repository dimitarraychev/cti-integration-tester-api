import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    let dataToValidate;

    if (typeof req.body.payload_json === "string") {
      try {
        dataToValidate = JSON.parse(req.body.payload_json);
      } catch (e) {
        return res.status(400).json({
          message: "Invalid JSON in payload_json",
        });
      }
    } else {
      dataToValidate = req.body;
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;
    next();
  };
