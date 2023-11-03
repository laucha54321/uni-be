import { db } from "../client";
import { notas } from "../schema/notas.schema";
import crypto from "crypto";

export const notaInsert = async (aux: any) => {
  aux = {
    id: crypto.randomUUID(),
    id_curso: aux.id_curso,
    id_persona: aux.id_persona,
  };

  const result = await db.insert(notas).values(aux);
  return result;
};
