import { relations } from "drizzle-orm";
import { mysqlTable, serial, int, varchar, text } from "drizzle-orm/mysql-core";

export const personas = mysqlTable("personas", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  nombres: varchar("nombres", { length: 100 }),
  dni: varchar("dni", { length: 8 }).unique(),
  hash: varchar("hash", { length: 256 }),
  email: varchar("email", { length: 256 }),
});

export const personasRelations = relations(personas, ({ many }) => ({
  cursoPersona: many(cursoPersona),
}));

export const notas = mysqlTable("notas", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  id_persona: varchar("id_persona", { length: 36 })
    .notNull()
    .references(() => personas.id),
  id_curso: varchar("id_curso", { length: 36 })
    .notNull()
    .references(() => cursos.id),
});

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

export const cursos = mysqlTable("curso", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  nombre: varchar("nombre", { length: 100 }),
  descripcion: text("descripcion"),
});

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
