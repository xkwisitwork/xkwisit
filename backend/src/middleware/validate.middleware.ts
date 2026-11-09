import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

import { validationError } from "../utils/errors.js";

type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query) as typeof req.query;
      if (schemas.params)
        req.params = schemas.params.parse(req.params) as typeof req.params;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(
          validationError(
            "Validation failed",
            err.issues.map((i) => ({
              field: i.path.join(".") || "body",
              message: i.message,
            })),
          ),
        );
        return;
      }
      next(err);
    }
  };
}
