import * as fastify from "fastify";
import { insertNotasSchema } from "../db/schema/notas.schema";
import { notaInsert } from "../db/functions/nota.functions";
import { Value } from "@sinclair/typebox/value";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "nota Router" };
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertNotasSchema, request.body)) {
      const result = notaInsert(request.body);
      return result;
    } else {
      reply.code(400);
      return { error: "Formato de Datos Incorrecto" };
    }
  });
  app.patch("/", async () => {
    return { hello: "nota Router" };
  });
  app.delete("/", async () => {
    return { hello: "nota Router" };
  });
}

export default router;
