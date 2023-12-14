import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-typebox";
import { Optional, Type } from "@sinclair/typebox";

export const id = Type.Object({
  id:Type.String({
    minLength:36,
    maxLength:36
  })
})

export const cursos = mysqlTable("curso", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  descripcion: text("descripcion"),
});

export const insertCursosSchema = createInsertSchema(cursos, {
  id: Type.Optional(Type.String()),
});
