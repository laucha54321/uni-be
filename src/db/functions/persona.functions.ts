import { db } from "../client";
import { personas } from "../schema/persona.schema";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
