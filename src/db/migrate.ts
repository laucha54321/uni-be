import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = createConnection({
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  port: 3306,
});
const db = drizzle(connection);

async function main() {
  console.log("Migrando Datos...");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migracion Completada!");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
