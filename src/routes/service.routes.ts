
import { Router } from "express";
import {
  createService,
  getServiceById,
} from "../controllers/service.controller";
import {
  serviceValidation,
  validateRequest,
} from "../middlewares/validation";

const router = Router();

// POST /services
router.post("/", serviceValidation, validateRequest, createService);

// GET /services/:id
router.get("/:id", getServiceById);

export default router;
