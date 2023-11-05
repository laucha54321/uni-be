import { db } from "../client";
import { cursos } from "../schema/curso.schema";
import crypto from "crypto";

export const cursoInsert = async (aux: any) => {
  aux = {
    id: crypto.randomUUID(),
    nombre: aux.nombre,
    descripcion: aux.descripcion,
  };

  const result = await db.insert(cursos).values(aux);
  return result;
};

export const cursoGetAll = async () => {
  const result = await db.select().from(cursos);
  return result;
};
