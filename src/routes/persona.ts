import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "persona Router" };
  });
  app.post("/", async () => {
    return { hello: "persona Router" };
  });
  app.patch("/", async () => {
    return { hello: "persona Router" };
  });
  app.delete("/", async () => {
    return { hello: "persona Router" };
  });
}

export default router;
