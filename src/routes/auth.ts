import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "auth router" };
  });
  app.post("/", async () => {
    return { hello: "auth router" };
  });
  app.patch("/", async () => {
    return { hello: "auth router" };
  });
  app.delete("/", async () => {
    return { hello: "auth router" };
  });
}

export default router;
