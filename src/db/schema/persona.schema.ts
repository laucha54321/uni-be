import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

import { cursoPersona } from "./cursoPersona.schema";
import { Optional, Type } from "@sinclair/typebox";

export const personas = mysqlTable("personas", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  nombres: varchar("nombres", { length: 100 }).notNull(),
  dni: varchar("dni", { length: 8 }).unique().notNull(),
  hash: varchar("hash", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
});

export const insertPersonasSchema = createInsertSchema(personas);

export const insertPersonasSchemaNoID = createInsertSchema(personas,{
  id:Type.Optional(Type.String()),
});


export const selectPersonasSchema = createSelectSchema(personas, {
  hash:Type.Optional(Type.String()),
});


export const personasRelations = relations(personas, ({ many }) => ({
  cursoPersona: many(cursoPersona),
}));
