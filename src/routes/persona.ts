import * as fastify from "fastify";
import { personaInsert } from "../db/functions/persona";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "persona Router" };
  });
  app.post("/", async (request, reply) => {
    const result = personaInsert(request.body);

    return result;
  });
  app.patch("/", async () => {
    return { hello: "persona Router" };
  });
  app.delete("/", async () => {
    return { hello: "persona Router" };
  });
}

export default router;
