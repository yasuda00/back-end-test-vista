
import { Router } from "express";
import {
  createService,
  getServiceById,
} from "../controllers/service.controller.js";

const router = Router();

// POST /services
router.post("/", createService);

// GET /services/:id
router.get("/:id", getServiceById);

export default router;
