
import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

// Company validation rules
export const companyValidation = [
  body("name")
    .isString()
    .withMessage("Company name must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),

  body("registrationNumber")
    .isString()
    .withMessage("Registration number must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Registration number is required."),
];

// Service validation rules
export const serviceValidation = [
  body("companyId")
    .custom((value) => Number.isInteger(value) && value > 0)
    .withMessage("Company ID must be a positive integer."),

  body("name")
    .isString()
    .withMessage("Service name must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Service name is required."),

  body("description")
    .optional({ values: "undefined" })
    .isString()
    .withMessage("Description must be a string."),

  body("price")
    .custom(
      (value) =>
        typeof value === "number" &&
        Number.isFinite(value) &&
        value >= 0
    )
    .withMessage("Price must be a valid non-negative number."),
];

// Validation error handler
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errors.array().map((error) => ({
        field: error.type === "field" ? error.path : "unknown",
        message: error.msg,
      })),
    });
    return;
  }

  next();
};
