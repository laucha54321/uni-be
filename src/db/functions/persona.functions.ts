import { db } from "../client";
import { personas } from "../schema/persona.schema";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";

export const personaInsert = async (aux: any) => {
  const saveHash = await bcrypt.hash(aux.hash, 10);

  aux = {
    id: crypto.randomUUID(),
    nombres: aux.nombres,
    dni: aux.dni,
    hash: saveHash,
    email: aux.email,
  };

  const result = await db.insert(personas).values(aux);
  return result;
};

export const personaSelect = async(aux: any)=>{
  const result = await db.select({
    field1: personas.id,
    field2: personas.nombres,
    field3: personas.dni,
    field4: personas.email
  }).from(personas).where(eq(personas.id, aux.id));
  return result;
}
