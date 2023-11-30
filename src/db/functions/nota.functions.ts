import { db } from "../client";
import {
  notas,
  insertNotasSchemaNoID,
  insertNotasSchema,
  insertNotasSchemaNoIDs,
} from "../schema/notas.schema";
import crypto from "crypto";
import { Static } from "@sinclair/typebox";
import { eq } from "drizzle-orm";
import { personas } from "../schema/persona.schema";
import { cursos } from "../schema/curso.schema";

type insertNotaNoIDType = Static<typeof insertNotasSchemaNoID>;
type insertNota = Static<typeof insertNotasSchema>;
type insertNotasNoIDs = Static<typeof insertNotasSchemaNoIDs>;

export const notaInsert = async (aux: insertNotaNoIDType) => {
  aux = {
    id: crypto.randomUUID(),
    id_curso: aux.id_curso,
    id_persona: aux.id_persona,
    calificacion: aux.calificacion,
    descripcion: aux.descripcion,
  };

  const result = await db.insert(notas).values(aux as insertNota);
  return result;
};

export const notaSelectOne = async (id: string) => {
  // const result = await db.query.notas.findMany({
  //   with: {
  //     personas: true,
  //   },
  // });
  const result = await db
    .select({
      id: notas.id,
      calificacion: notas.calificacion,
      descripcion: notas.descripcion,
      curso: cursos.nombre,
      nombre: personas.nombres,
      dni: personas.dni,
      email: personas.email,
    })
    .from(notas)
    .leftJoin(personas, eq(personas.id, notas.id_persona))
    .leftJoin(cursos, eq(cursos.id, notas.id_curso))
    .where(eq(notas.id, id));
  // const result = await db.select().from(notas).leftjoin();
  return result;
};

export const notaSelectPersona = async (id: string) => {
  const result = await db
    .select({
      id: notas.id,
      calificacion: notas.calificacion,
      descripcion: notas.descripcion,
      curso: cursos.nombre,
      nombre: personas.nombres,
      dni: personas.dni,
      email: personas.email,
    })
    .from(notas)
    .leftJoin(personas, eq(personas.id, notas.id_persona))
    .leftJoin(cursos, eq(cursos.id, notas.id_curso))
    .where(eq(personas.id, id));
  return result;
};

export const notaUpdate = async (aux: insertNotasNoIDs) => {
  const id = aux.id;

  delete aux.id_curso;
  delete aux.id_persona;

  const result = await db.update(notas).set(aux).where(eq(notas.id, id));
  return result;
};

export const notaDelte = async (id: string) => {
  const result = await db.delete(notas).where(eq(notas.id, id));
  return result;
};
