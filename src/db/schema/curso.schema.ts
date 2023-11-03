import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-typebox";

export const cursos = mysqlTable("curso", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  nombre: varchar("nombre", { length: 100 }),
  descripcion: text("descripcion"),
});

export const insertCursosSchema = createInsertSchema(cursos);
