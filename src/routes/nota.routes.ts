import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "nota Router" };
  });
  app.post("/", async () => {
    return { hello: "nota Router" };
  });
  app.patch("/", async () => {
    return { hello: "nota Router" };
  });
  app.delete("/", async () => {
    return { hello: "nota Router" };
  });
}

export default router;
