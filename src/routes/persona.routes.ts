import * as fastify from "fastify";
import { personaInsert } from "../db/functions/persona.functions";
import { insertPersonasSchema } from "../db/schema/persona.schema";
import { Value } from "@sinclair/typebox/value";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "persona Router" };
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertPersonasSchema, request.body)) {
      const result = personaInsert(request.body);
      return result;
    } else {
      reply.code(400);
      return { error: "Formato de Datos Incorrecto" };
    }
  });
  app.patch("/", async () => {
    return { hello: "persona Router" };
  });
  app.delete("/", async () => {
    return { hello: "persona Router" };
  });
}

export default router;
