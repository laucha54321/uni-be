import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE!,
    port: 3306,
  },
} satisfies Config;
