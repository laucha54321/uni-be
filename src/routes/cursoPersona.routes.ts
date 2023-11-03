import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.post("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.patch("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.delete("/", async () => {
    return { hello: "cursoPersona Router" };
  });
}

export default router;
