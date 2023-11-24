import * as fastify from "fastify";
import { insertCursoPersonaSchema } from "../../db/schema/cursoPersona.schema";
import { cursoPersonaInsert } from "../../db/functions/cursoPersona.function";
import { Value } from "@sinclair/typebox/value";
import errorHandler from "../errorHandler";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.post("/", async (request, reply) => {
    if (Value.Check(insertCursoPersonaSchema, request.body)) {
      const result = cursoPersonaInsert(request.body);
      return result;
    } else {
      reply.code(400).send;
    }
  });
  app.patch("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.delete("/", async () => {
    return { hello: "cursoPersona Router" };
  });
  app.addHook("onSend", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      const err = null
      const response = errorHandler(reply.statusCode,"Curso");
      done(err, response.error)
    }else{
      done()
    }
  });
}

export default router;
