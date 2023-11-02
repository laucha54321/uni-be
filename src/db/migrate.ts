import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";
import "dotenv/config";

const connection = createConnection({
  password: "",
  host: "laureanoliva.com",
  user: "u677421159_laucha54321",
  database: "u677421159_itFinal",
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
