import { db } from "../client";
import { cursoPersona } from "../schema/cursoPersona.schema";

export const cursoPersonaInsert = async (aux: any) => {
  aux = {
    id: crypto.randomUUID(),
    id_curso: aux.id_curso,
    id_persona: aux.id_persona,
    categoria: aux.categoria,
  };

  const result = await db.insert(cursoPersona).values(aux);
  return result;
};
