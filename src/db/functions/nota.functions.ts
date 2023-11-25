import { db } from "../client";
import { notas, insertNotasSchemaNoID, insertNotasSchema } from "../schema/notas.schema";
import crypto from "crypto";
import { Static } from '@sinclair/typebox'
import { eq } from "drizzle-orm";

type insertNotaNoIDType = Static<typeof insertNotasSchemaNoID>
type insertNota = Static<typeof insertNotasSchema>

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

export const notaSelect = async (id:string) => {
  const result = await db.select().from(notas).where(eq(notas.id, id))
  return result;
}
