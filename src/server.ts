
import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import serviceRoutes from "./routes/service.routes.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use("/companies", companyRoutes);
app.use("/services", serviceRoutes);

// Health check
app.get("/health", async (_req, res) => {
  try {
    await prisma.$connect();

    res.status(200).json({
      success: true,
      message: "API and database are working!",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
