import cors from "cors";
import { corsOptions } from "../config/cors.js";

/** Express CORS middleware configured from env. */
export const corsMiddleware = cors(corsOptions);
