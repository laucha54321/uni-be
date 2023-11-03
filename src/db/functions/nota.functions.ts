import { db } from "../client";
import { notas } from "../schema/notas.schema";

export const notaInsert = async (aux: any) => {
  const result = await db.insert(notas).values(aux);
  return result;
};
