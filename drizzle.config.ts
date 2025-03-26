import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "singlestore",
  schema: "./src/server/db/schema.ts",
  tablesFilter: ["google-drive-clone_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST!,
    port: Number(process.env.SINGLESTORE_PORT) || 3306,
    user: process.env.SINGLESTORE_USER!,
    password: process.env.SINGLESTORE_PW!,
    database: process.env.SINGLESTORE_DB!,
    ssl: {},
  },
});
