import { db } from "../client";
import { insertPersonasSchemaNoID, personas } from "../schema/persona.schema";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { selectPersonasSchema, insertPersonasSchema,insertPersonaNoIDNoHash } from "../schema/persona.schema";



import { Type, Static } from '@sinclair/typebox'

type selectPersonas = Static<typeof selectPersonasSchema>

type insertPersonas = Static<typeof insertPersonasSchema>
type insertPersonasNoID = Static<typeof insertPersonasSchemaNoID>
type insertPersonaNoIDNoHash = Static<typeof insertPersonaNoIDNoHash>

export const personaInsert = async (aux: insertPersonasNoID) => {
  const saveHash = await bcrypt.hash(aux.hash, 10);
  
  aux = {
    id: crypto.randomUUID(),
    nombres: aux.nombres,
    dni: aux.dni,
    hash: saveHash,
    email: aux.email,
  };

  const result = await db.insert(personas).values(aux as insertPersonas);
  return result;
};

export const personaSelect = async(id:string)=>{
  const result = await db.select({
    id: personas.id,
    nombres: personas.nombres,
    dni: personas.dni,
    email: personas.email
  }).from(personas).where(eq(personas.id, id));
  return result;
}

export const personaUpdate = async(aux:insertPersonaNoIDNoHash,id:string)=>{
  //elimino el id porsilasdudas
  delete aux.id;
  delete aux.hash;

  const result = await db.update(personas).set(aux).where(eq(personas.id,id))
  return result
}

export const personaDelete = async(id:string)=>{
  const result = await db.delete(personas).where(eq(personas.id,id))
  return result
}