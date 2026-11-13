
import { Router } from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/company.controller";
import {
  companyValidation,
  validateRequest,
} from "../middlewares/validation";

const router = Router();

// POST /companies
router.post("/", companyValidation, validateRequest, createCompany);

// GET /companies
router.get("/", getCompanies);

export default router;
