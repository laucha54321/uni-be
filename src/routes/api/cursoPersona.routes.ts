import * as fastify from "fastify";
import { insertCursoPersonaSchema } from "../../db/schema/cursoPersona.schema";
import { cursoPersonaInsert } from "../../db/functions/cursoPersona.function";
import { Value } from "@sinclair/typebox/value";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertCursoPersonaSchema, request.body)) {
      const result = cursoPersonaInsert(request.body);
      return result;
    } else {
      reply.code(400);
      return { error: "Formato de Datos Incorrecto" };
    }
  });
  app.patch("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.delete("/", async () => {
    return { hello: "cursoPersona Router" };
  });
}

export default router;
