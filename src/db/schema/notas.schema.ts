import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-typebox";

import { personas } from "./persona.schema";
import { cursos } from "./curso.schema";

export const notas = mysqlTable("notas", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  id_persona: varchar("id_persona", { length: 36 })
    .notNull()
    .references(() => personas.id),
  id_curso: varchar("id_curso", { length: 36 })
    .notNull()
    .references(() => cursos.id),
});

export const insertNotasSchema = createInsertSchema(notas);

export const notasRelations = relations(notas, ({ one }) => ({
  personas: one(personas, {
    fields: [notas.id_persona],
    references: [personas.id],
  }),
  cursos: one(cursos, {
    fields: [notas.id_curso],
    references: [cursos.id],
  }),
}));
