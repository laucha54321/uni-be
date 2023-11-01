import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "curso Router" };
  });
  app.post("/", async () => {
    return { hello: "curso Router" };
  });
  app.patch("/", async () => {
    return { hello: "curso Router" };
  });
  app.delete("/", async () => {
    return { hello: "curso Router" };
  });
}

export default router;
