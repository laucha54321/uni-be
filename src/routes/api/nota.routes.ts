import * as fastify from "fastify";
import {
  id,
  insertNotasSchemaNoID,
  insertNotasSchemaNoIDs,
} from "../../db/schema/notas.schema";
import {
  notaInsert,
  notaSelectOne,
  notaDelte,
  notaUpdate,
  notaSelectPersona,
} from "../../db/functions/nota.functions";
import { Value } from "@sinclair/typebox/value";
import { Type, Static } from "@sinclair/typebox";
import { handler, uriType } from "../errorHandler";

import { getToken, validateToken } from "../../db/functions/auth.function";

async function router(app: fastify.FastifyInstance) {
  app.get("/:id", async (request, reply) => {
    const uri = { uri: "4a108bee-920a-488a-a21e-1fa1695cf11d" };
    if (Value.Check(id, request.params)) {
      const result = await notaSelectOne(request.params.id);
      return result;
    } else {
      reply.code(400).send(uri);
    }
  });

  app.get("/persona", async (request, reply) => {
    const uri = { uri: "ce034190-1592-4243-8ea6-20359abd6c53" };
    const aux = request.headers.userid as string;
    if (Value.Check(id, { id: aux }) && aux !== undefined) {
      const result = await notaSelectPersona(aux);
      return result;
    } else {
      reply.code(400).send(uri);
    }
  });

  app.post("/", async (request, reply) => {
    const uri = { uri: "c6f582dd-c403-43c6-9b29-fb48c8f72a2a" };
    if (Value.Check(insertNotasSchemaNoID, request.body)) {
      const result = notaInsert(request.body);
      return result;
    } else {
      reply.code(400).send(uri);
    }
  });
  app.patch("/", async (request, reply) => {
    const uri = { uri: "33801332-a281-4d3a-88a2-0a5979cb96fc" };
    if (Value.Check(insertNotasSchemaNoIDs, request.body)) {
      const result = notaUpdate(request.body);
      return result;
    } else {
      reply.code(400).send(uri);
    }
  });
  app.delete("/:id", async (request, reply) => {
    const uri = { uri: "b0c33bf7-fce2-4839-85f5-83a0a5464580" };

    if (Value.Check(id, request.params)) {
      const result = await notaDelte(request.params.id);
      if (result[0]["affectedRows"] > 0) {
        reply.send(result[0]);
      } else {
        reply.code(404).send(uri);
      }
    } else {
      reply.code(400).send(uri);
    }
  });

  app.addHook("preSerialization", (request, reply, payload, done) => {
    if (reply.statusCode >= 300) {
      const aux = payload as uriType;
      const err = null;
      const response = handler(reply.statusCode, "Nota", aux.uri);
      done(err, response);
    } else {
      done();
    }
  });
}

export default router;
