import { db } from "../client";
import { cursos } from "../schema/curso.schema";

export const cursoInsert = async (aux: any) => {
  const result = await db.insert(cursos).values(aux);
  return result;
};
