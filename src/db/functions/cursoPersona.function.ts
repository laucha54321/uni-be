import { db } from "../client";
import { cursoPersona } from "../schema/cursoPersona.schema";

export const cursoPersonaInsert = async (aux: any) => {
  const result = await db.insert(cursoPersona).values(aux);
  return result;
};
