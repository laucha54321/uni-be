import { resourceUsage } from "process";
import { db } from "../client";
import { cursoPersona } from "../schema/cursoPersona.schema";
import crypto from "crypto";
import { eq, and } from "drizzle-orm";
import { cursos } from "../schema/curso.schema";

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

export const cursoPersonaGetPersona = async (id: string) => {
  const result = await db
    .select({
      nombre: cursos.nombre,
      descripcion: cursos.descripcion,
      categoria: cursoPersona.categoria,
    })
    .from(cursoPersona)
    .leftJoin(cursos, eq(cursos.id, cursoPersona.id_curso))
    .where(eq(cursoPersona.id_persona, id));
  return result;
};

export const esProfesor = async (idProfesor: string, idCurso: string) => {
  const result = await db
    .select({ categoria: cursoPersona.categoria })
    .from(cursoPersona)
    .where(
      and(
        eq(cursoPersona.id_persona, idProfesor),
        eq(cursoPersona.id_curso, idCurso),
        eq(cursoPersona.categoria, "PRO")
      )
    );
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};
