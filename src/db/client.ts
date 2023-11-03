import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  port: 3306,
});

export const db = drizzle(pool);
