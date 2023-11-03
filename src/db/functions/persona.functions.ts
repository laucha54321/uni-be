import { db } from "../client";
import { personas } from "../schema/persona.schema";

export const personaInsert = async (aux: any) => {
  const result = await db.insert(personas).values(aux);
  return result;
};
