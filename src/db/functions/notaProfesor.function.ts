import { notas } from "../schema/notas.schema";
import { personas } from "../schema/persona.schema";
import { cursos } from "../schema/curso.schema";
import { eq } from "drizzle-orm";
import { db } from "../client";
export const getNotaProfesor = async (idCurso: string) => {
  const result = await db
    .select({
      id: notas.id,
      calificacion: notas.calificacion,
      descripcion: notas.descripcion,
      curso: {
        id: cursos.id,
        nombre: cursos.nombre,
        descripcion: cursos.descripcion,
      },
      persona: {
        id: personas.id,
        nombre: personas.nombres,
        dni: personas.dni,
        email: personas.email,
      },
    })
    .from(notas)
    .leftJoin(personas, eq(personas.id, notas.id_persona))
    .leftJoin(cursos, eq(cursos.id, notas.id_curso))
    .where(eq(notas.id_curso, idCurso));
  return result;
};
