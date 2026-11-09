import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { corsOptions } from "./config/cors.js";
import { env } from "./config/env.js";
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
  requestIdMiddleware,
} from "./middleware/index.js";
import { assessmentRoutes } from "./modules/assessment/index.js";
import { authRoutes } from "./modules/auth/index.js";
import { bookingRoutes } from "./modules/bookings/index.js";
import { dashboardRoutes } from "./modules/dashboard/index.js";
import { healthRoutes } from "./modules/health/index.js";
import { organizationRoutes } from "./modules/organizations/index.js";
import { platformRoutes } from "./modules/platform/index.js";
import { registerDomainRoutes } from "./modules/registerDomainRoutes.js";
import { sheetDownloadRoutes } from "./modules/sheet-downloads/index.js";
import { xrayRoutes } from "./modules/xray/index.js";


export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(requestIdMiddleware);

  if (env.NODE_ENV !== "test") {
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  }

  const api = express.Router();
  api.use("/health", healthRoutes);
  api.use("/auth", authRoutes);
  api.use("/organizations", organizationRoutes);
  api.use("/assessment", assessmentRoutes);
  api.use("/bookings", bookingRoutes);
  api.use("/xray", xrayRoutes);
  api.use("/sheet-downloads", sheetDownloadRoutes);
  api.use("/dashboard", dashboardRoutes);
  api.use("/platform", platformRoutes);
  registerDomainRoutes(api);

  app.use("/api", api);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
}
