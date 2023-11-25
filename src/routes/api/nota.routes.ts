import * as fastify from "fastify";
import { insertNotasSchema,selectNotaSchema, id } from "../../db/schema/notas.schema";
import { notaInsert, notaSelect } from "../../db/functions/nota.functions";
import { Value } from "@sinclair/typebox/value";
import { handler, uriSchema, uriType} from "../errorHandler";

async function router(app: fastify.FastifyInstance) {
  app.get("/:id",{
    schema:{
      response:{
        200:selectNotaSchema,
      }
    }
  }, async (request, reply) => {
    
    if(Value.Check(id,request.params)){
      const result = await notaSelect(request.params.id)
      if(result.length>0){
        return result[0]
      }else{
        reply.code(404).send({});
      }
    }else{
      reply.code(400).send({});
    }
  });
  app.post("/", async (request, reply) => {
    const uri = {uri:""}
    if (Value.Check(insertNotasSchema, request.body)) {
      const result = notaInsert(request.body);
      return result;
    } else {
      reply.code(400).send({});
    }
  });
  app.patch("/", async () => {
    const uri = {uri:""}
    return { hello: "nota Router" };
  });
  app.delete("/", async () => {
    const uri = {uri:""}
    return { hello: "nota Router" };
  });
  app.addHook("preSerialization", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      const aux = payload as uriType
      const err = null
      const response = handler(reply.statusCode,"Nota", aux.uri);
      done(err, response)
    }else{
      done()
    }
  });
}

export default router;
