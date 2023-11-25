import * as fastify from "fastify";
import { insertCursosSchema } from "../../db/schema/curso.schema";
import { Value } from "@sinclair/typebox/value";
import { cursoInsert, cursoGetAll } from "../../db/functions/curso.function";
import { handler, uriSchema, uriType } from "../errorHandler";

async function router(app: fastify.FastifyInstance) {
  app.get("/", async () => {
    const uri = {uri:""}
    return cursoGetAll();
  });
  app.post("/", async (request, reply) => {
    const uri = {uri:""}
    if (Value.Check(insertCursosSchema, request.body)) {
      const result = cursoInsert(request.body);
      return result;
    } else {
      reply.code(400).send(uri);
    }
  });
  app.patch("/", async () => {
    const uri = {uri:""}
    return { hello: "curso Router" };
  });
  app.delete("/",async () => {
    const uri = {uri:""}
    return { hello: "curso Router" };
  });
  app.addHook("preSerialization", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      const aux = payload as uriType
      const err = null
      const response = handler(reply.statusCode,"Curso", aux.uri);
      done(err, response)
    }else{
      done()
    }
  });
}

export default router;
