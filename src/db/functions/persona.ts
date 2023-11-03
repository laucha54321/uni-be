import { db } from "../client";
import { insertPersonasSchema, personas } from "../schema";
import { Value } from "@sinclair/typebox/value";

export const personaInsert = async (aux: any) => {
  console.log(aux);
  console.log(Value.Check(insertPersonasSchema, aux));
  if (Value.Check(insertPersonasSchema, aux)) {
    const result = await db.insert(personas).values(aux);
    return result;
  } else {
    return Value.Check(insertPersonasSchema, aux);
  }
};
