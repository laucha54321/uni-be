import * as fastify from "fastify";
import { getToken } from "../../db/functions/auth.function";
import { Value } from "@sinclair/typebox/value";
import { Type } from "@sinclair/typebox";

const authSchema = Type.Object({
  dni: Type.String(),
  contrasena: Type.String(),
});

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "auth router" };
  });
  app.post("/", async (request, reply) => {
    const uri = { uri: "" };

    if (Value.Check(authSchema, request.body)) {
      return getToken(request.body.dni, request.body.contrasena);
    } else {
      reply.code(400).send(uri);
    }
  });
  app.patch("/", async () => {
    return { hello: "auth router" };
  });
  app.delete("/", async () => {
    return { hello: "auth router" };
  });
}

export default router;
