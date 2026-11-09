import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { startJobs } from "./jobs/index.js";

async function main() {
  try {
    await connectDatabase();
  } catch (err) {
    console.error(
      "[db] connection failed - API will start anyway; DB-backed routes may fail until Mongo is reachable",
      err instanceof Error ? err.message : err,
    );
  }

  if (env.NODE_ENV !== "test") {
    startJobs();
  }

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`[server] listening on http://localhost:${env.PORT}/api`);
  });
}

main().catch((err) => {
  console.error("[server] failed to start", err);
  process.exit(1);
});
