import * as fastify from "fastify";
import { insertCursosSchema } from "../../db/schema/curso.schema";
import { Value } from "@sinclair/typebox/value";
import { cursoInsert, cursoGetAll } from "../../db/functions/curso.function";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return cursoGetAll();
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertCursosSchema, request.body)) {
      const result = cursoInsert(request.body);
      return result;
    } else {
      reply.code(400);
      return { error: "Formato de Datos Incorrecto" };
    }
  });
  app.patch("/", async () => {
    return { hello: "curso Router" };
  });
  app.delete("/", async () => {
    return { hello: "curso Router" };
  });
}

export default router;
