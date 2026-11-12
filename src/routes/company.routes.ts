
import { Router } from "express";
import {
  createCompany,
  getCompanies,
} from "../controllers/company.controller.js";

const router = Router();

// POST /companies
router.post("/", createCompany);

// GET /companies
router.get("/", getCompanies);

export default router;
