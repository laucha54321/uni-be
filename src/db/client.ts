import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { Config } from "drizzle-kit";
import dotenv from "dotenv";
import * as notasSchema from "./schema/notas.schema";
import * as cursoSchema from "./schema/curso.schema";
import * as personasSchema from "./schema/persona.schema";
import * as cursoPersonaSchema from "./schema/cursoPersona.schema";

dotenv.config();

const schema = {
  ...notasSchema,
  ...cursoSchema,
  ...personasSchema,
  ...cursoPersonaSchema,
};

const pool = mysql.createPool({
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  port: 3306,
});

export const db = drizzle(pool, { schema, mode: "default" });
