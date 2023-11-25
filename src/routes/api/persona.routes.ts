import * as fastify from "fastify";
import { personaDelete, personaInsert, personaSelect, personaUpdate } from "../../db/functions/persona.functions";
import { insertPersonasSchemaNoID, selectPersonasSchema,insertPersonaNoIDNoHash, id} from "../../db/schema/persona.schema";
import { Value } from "@sinclair/typebox/value";
import { handler,  uriType } from "../errorHandler";
import { ErrorPacketParams} from "mysql2";

const router = async (app: fastify.FastifyInstance,opts:any,done:any) => {
  app.get("/:id",{
    schema:{
      response:{
        200:selectPersonasSchema,
      }
    }
  }, async (request, reply) => {
    const uri ={ uri:"083577f6-21bb-475b-9576-49933ce574fb" }
    if(Value.Check(id,request.params)){
      const result = await personaSelect(request.params.id)
      if(result.length>0){
        return result[0]
      }else{
        reply.code(404).send(uri);
      }
    }else{
      reply.code(400).send(uri);
    }
  });

  app.post("/",
  async (request, reply) => {
    const uri = {uri:"430e7de2-0001-4662-867a-21ca4cec8bb0"}
    if (Value.Check(insertPersonasSchemaNoID, request.body)) {
      try{
        const result = await personaInsert(request.body);
        return result;
      }catch(error:any){
        if((error as ErrorPacketParams).code === "ER_DUP_ENTRY"){
          reply.code(409).send(uri);
        }else{
          reply.send(error)
        }
      }
    } else {
      reply.code(400).send(uri);
    }
  });

  app.patch("/:id",
    async (request,reply) => {

    const uri = {uri:"9f6ff3b2-3da4-4c9f-85c4-6808dc6f3006"}

    if(Value.Check(insertPersonaNoIDNoHash,request.body) && Value.Check(id,request.params)){
      try{
        const result = await personaUpdate(request.body, request.params.id)
        if(result[0]['affectedRows']>0){
          return result[0]
        }else{
          reply.code(404).send(uri)
        }
      }catch(error:any){
        reply.send(error)
      }

    }else{
      reply.code(400).send(uri)
    }
  });

  app.delete("/:id",
  async (request,reply) => {

    const uri = {uri:"060f7678-1468-4b45-9ebd-7615fbe7d800"}

    if(Value.Check(selectPersonasSchema,request.body) && Value.Check(id,request.params)){
      if(request.params.id === request.body.id){
        const result = await personaDelete(request.body.id)

        if(result[0]['affectedRows']>0){
          reply.send(result[0])
        }else{
          reply.code(404).send(uri)
        }
      }else{
        reply.code(400).send(uri)
      }
    }else{
      reply.code(400).send(uri)
    }
  });

  // Para que llame a preSerialization tengo que hacer .send({}) xq si fuera un string o null
  // no pasa por este hook a este hook.
  app.addHook("preSerialization", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      if(payload){
        const aux = payload as uriType
        const err = null
        const response = handler(reply.statusCode,"Persona", aux.uri || "");
        done(err, response)
      }
    }else{
      done()
    }
  });
}

export default router;
