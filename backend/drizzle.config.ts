import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "src/database/migrations",
  schema: "src/database/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "src/database/sqlite.db",
  },
});
