import * as fastify from "fastify";
import { insertCursoPersonaSchema } from "../../db/schema/cursoPersona.schema";
import { cursoPersonaInsert } from "../../db/functions/cursoPersona.function";
import { Value } from "@sinclair/typebox/value";
import {handler, uriSchema,uriType} from "../errorHandler";

async function router(app: fastify.FastifyInstance) {
  app.get("/",{
    schema:{
      response:{
        400:uriSchema,
        404:uriSchema,
      }
    }
  }, async () => {
    const uri = {uri:""}
    return { hello: "cursoPersona Router" };
  });
  app.post("/",{
    schema:{
      response:{
        400:uriSchema,
        404:uriSchema,
      }
    }
  }, async (request, reply) => {
    const uri = {uri:""}
    if (Value.Check(insertCursoPersonaSchema, request.body)) {
      const result = cursoPersonaInsert(request.body);
      return result;
    } else {
      reply.code(400).send({});
    }
  });
  app.patch("/",{
    schema:{
      response:{
        400:uriSchema,
        404:uriSchema,
      }
    }
  }, async () => {
    const uri = {uri:""}
    return { hello: "cursoPersona Router" };
  });
  app.delete("/",{
    
    schema:{
      response:{
        400:uriSchema,
        404:uriSchema,
      }
    }
  }, async () => {
    const uri = {uri:""}
    return { hello: "cursoPersona Router" };
  });
  app.addHook("preSerialization", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      const aux = payload as uriType
      const err = null
      const response = handler(reply.statusCode,"Curso_Nota", aux.uri);
      done(err, response)
    }else{
      done()
    }
  });
}

export default router;
