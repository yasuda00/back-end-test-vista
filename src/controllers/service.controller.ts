
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import type {
  CreateServiceDto,
  ServiceResponseDto,
} from "../dtos/service.dto.js";

// POST /services
export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId, name, description, price } =
      req.body as CreateServiceDto;

    // Validate required fields
    if (
      !Number.isInteger(companyId) ||
      companyId <= 0 ||
      typeof name !== "string" ||
      !name.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      (description !== undefined && typeof description !== "string")
    ) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid companyId, name, price and description.",
      });
      return;
    }

    // Check whether the company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found.",
      });
      return;
    }

    const service = await prisma.service.create({
      data: {
        companyId,
        name: name.trim(),
        description: description?.trim() || null,
        price,
      },
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: {
        ...service,
        price: service.price.toString(),
      },
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service.",
    });
  }
};

// GET /services/:id
export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
      return;
    }

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      res.status(404).json({
        success: false,
        message: "Service not found.",
      });
      return;
    }

    const data: ServiceResponseDto = {
      id: service.id,
      companyId: service.companyId,
      name: service.name,
      description: service.description,
      price: service.price.toString(),
    };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve service.",
    });
  }
};
