import { db } from "../client";
import { cursos } from "../schema/curso.schema";

export const cursoInsert = async (aux: any) => {
  aux = {
    id: crypto.randomUUID(),
    nombre: aux.nombre,
    descripcion: aux.descripcion,
  };

  const result = await db.insert(cursos).values(aux);
  return result;
};
