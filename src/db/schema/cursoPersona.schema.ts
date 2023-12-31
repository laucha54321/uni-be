import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-typebox";
import { cursos } from "./curso.schema";
import { personas } from "./persona.schema";
import { Optional, Type } from "@sinclair/typebox";

export const id = Type.Object({
  id:Type.String({
    minLength:36,
    maxLength:36
  })
})

export const cursoPersona = mysqlTable("cursoPersona", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  id_curso: varchar("id_curso", { length: 36 })
    .notNull()
    .references(() => cursos.id),
  id_persona: varchar("id_persona", { length: 36 })
    .notNull()
    .references(() => personas.id),
  categoria: varchar("categoria", { length: 3 }),
});

export const insertCursoPersonaSchema = createInsertSchema(cursoPersona, {
  id: Type.Optional(Type.String()),
});

export const cursoPersonaRelations = relations(cursoPersona, ({ one }) => ({
  personas: one(personas, {
    fields: [cursoPersona.id_persona],
    references: [personas.id],
  }),
  cursos: one(cursos, {
    fields: [cursoPersona.id_curso],
    references: [cursos.id],
  }),
}));
