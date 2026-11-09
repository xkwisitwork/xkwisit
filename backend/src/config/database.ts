import mongoose from "mongoose";

import { env } from "./env.js";

/**
 * Resolve which DB name to use. Prefer MONGODB_DB_NAME, else the URI path.
 * Throws if neither is set so we never silently write to Mongo's default "test".
 */
function resolveDbName(uri: string, explicit?: string): string {
  if (explicit?.trim()) return explicit.trim();

  try {
    const normalized = uri
      .replace(/^mongodb\+srv:\/\//i, "https://")
      .replace(/^mongodb:\/\//i, "http://");
    const path = new URL(normalized).pathname.replace(/^\//, "").split("/")[0] ?? "";
    if (path) return path;
  } catch {
    // fall through
  }

  throw new Error(
    'Mongo database name missing. Put it in MONGODB_URI (…/xkwisit?…) or set MONGODB_DB_NAME. Without this, Mongo defaults to "test".',
  );
}

export async function connectDatabase(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);
  const dbName = resolveDbName(env.MONGODB_URI, env.MONGODB_DB_NAME);

  await mongoose.connect(env.MONGODB_URI, {
    dbName,
    serverSelectionTimeoutMS: 12_000,
  });

  const host = mongoose.connection.host;
  const name = mongoose.connection.name;
  console.log(`[db] connected db="${name}" host="${host}"`);

  if (name === "test") {
    await mongoose.disconnect();
    throw new Error(
      'Refusing to run against the "test" database. Set MONGODB_URI path or MONGODB_DB_NAME to your real DB (e.g. xkwisit).',
    );
  }

  return mongoose;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
