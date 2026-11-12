
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import type {
  CreateCompanyDto,
  CompanyWithServicesDto,
} from "../dtos/company.dto.js";

// POST /companies
export const createCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, registrationNumber } = req.body as CreateCompanyDto;

    // Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof registrationNumber !== "string" ||
      !registrationNumber.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Name and registration number are required.",
      });
      return;
    }

    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        registrationNumber: registrationNumber.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: company,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message: "Registration number already exists.",
      });
      return;
    }

    console.error("Create company error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create company.",
    });
  }
};

// GET /companies
export const getCompanies = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        services: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const data: CompanyWithServicesDto[] = companies.map((company) => ({
      id: company.id,
      name: company.name,
      registrationNumber: company.registrationNumber,
      services: company.services.map((service) => ({
        id: service.id,
        companyId: service.companyId,
        name: service.name,
        description: service.description,
        price: service.price.toString(),
      })),
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Get companies error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve companies.",
    });
  }
};
