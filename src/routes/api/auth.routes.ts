import * as fastify from "fastify";
import { getToken, validateToken } from "../../db/functions/auth.function";
import { Value } from "@sinclair/typebox/value";
import { Type } from "@sinclair/typebox";
import { handler, uriType } from "../errorHandler";

const authSchema = Type.Object({
  dni: Type.String(),
  contrasena: Type.String(),
});

async function router(app: fastify.FastifyInstance) {
  app.post("/", async (request, reply) => {
    const uri = { uri: "" };

    if (Value.Check(authSchema, request.body)) {
      const result = await getToken(request.body.dni, request.body.contrasena);
      if (typeof result === "number") {
        reply.code(result).send(uri);
      } else {
        return result;
      }
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
  app.addHook("preSerialization", (request, reply, payload, done) => {
    if (reply.statusCode >= 300) {
      if (payload) {
        const aux = payload as uriType;
        const err = null;
        const response = handler(reply.statusCode, "persona", aux.uri || "");
        done(err, response);
      }
    } else {
      done();
    }
  });
}

export default router;
