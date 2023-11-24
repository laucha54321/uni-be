import * as fastify from "fastify";
import { insertCursosSchema } from "../../db/schema/curso.schema";
import { Value } from "@sinclair/typebox/value";
import { cursoInsert, cursoGetAll } from "../../db/functions/curso.function";
import errorHandler from "../errorHandler";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return cursoGetAll();
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertCursosSchema, request.body)) {
      const result = cursoInsert(request.body);
      return result;
    } else {
      reply.code(400).send();
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
