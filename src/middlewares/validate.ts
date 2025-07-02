import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    let dataToValidate;

    // Handle form-data or urlencoded with payload_json
    if (typeof req.body.payload_json === "string") {
      try {
        dataToValidate = JSON.parse(req.body.payload_json);
      } catch (e) {
        return res.status(400).json({
          message: "Invalid JSON in payload_json",
        });
      }
    } else {
      // Assume raw JSON body (application/json)
      dataToValidate = req.body;
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: result.error.flatten(),
      });
    }

    // Replace request body with the validated object
    req.body = result.data;
    next();
  };
