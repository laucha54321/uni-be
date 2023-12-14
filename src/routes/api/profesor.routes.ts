import { Value } from "@sinclair/typebox/value";
import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { id } from "../../db/schema/curso.schema";
import { esProfesor } from "../../db/functions/cursoPersona.function";
import { getNotaProfesor } from "../../db/functions/notaProfesor.function";
import { handler } from "../errorHandler";
import { uriType } from "../errorHandler";

async function router(app: FastifyInstance) {
  app.get("/:id", async (request, reply) => {
    const uri = { uri: "" };
    const aux = request.headers.userid as string;
    if (Value.Check(id, request.params)) {
      if (Value.Check(id, { id: aux })) {
        const esProfe = await esProfesor(aux, request.params.id);
        if (esProfe) {
          const aux = await getNotaProfesor(request.params.id);
          return aux;
        } else {
          reply.code(403).send(uri);
        }
      }
    }
  });
  app.addHook("preSerialization", (request, reply, payload, done) => {
    if (reply.statusCode >= 300) {
      if (payload) {
        const aux = payload as uriType;
        const err = null;
        const response = handler(reply.statusCode, "Profesor", aux.uri || "");
        done(err, response);
      }
    } else {
      done();
    }
  });
}

export default router;
