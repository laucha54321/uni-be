import * as fastify from "fastify";
import { personaInsert, personaSelect, personaUpdate } from "../../db/functions/persona.functions";
import { insertPersonasSchemaNoID, selectPersonasSchema} from "../../db/schema/persona.schema";
import { Value } from "@sinclair/typebox/value";
import { Type } from "@sinclair/typebox";
import errorHandler from "../errorHandler";

const id = Type.Object({
  id:Type.String({
    minLength:36,
    maxLength:36
  })
})


const router = async (app: fastify.FastifyInstance,opts:any,done:any) => {
  app.get("/:id",{
    schema:{
      response:{
        200:selectPersonasSchema
      }
    }
  }, async (request, reply) => {
    if(Value.Check(id,request.params)){
      const result = await personaSelect(request.params.id)
      if(result.length>0){
        return result
      }else{
        reply.code(404).send();
      }
    }else{
      reply.code(400).send();
    }
  });

  app.post("/",{
    schema:{
      body:insertPersonasSchemaNoID
    }
  },
  async (request, reply) => {
    const body = request.body
    if (Value.Check(insertPersonasSchemaNoID, body)) {
      const result = personaInsert(body);
      return result;
    } else {
      reply.code(400);
    }
  });

  app.patch("/:id",{
    schema:{
      body:selectPersonasSchema
    }
  }, async (request,reply) => {
    if(Value.Check(selectPersonasSchema,request.body) && Value.Check(id,request.params)){
      if(request.params.id === request.body.id){
        const result = await personaUpdate(request.body)
        return result
      }else{
        reply.code(400).send()
      }
    }else{
      reply.code(400).send()
    }
  });

  app.delete("/:id",
  {
    schema:{
      body:selectPersonasSchema
    }
  },
  async (request,reply) => {
    if(Value.Check(selectPersonasSchema,request.body) && Value.Check(id,request.params)){
      if(request.params.id === request.body.id){
        const result = await personaUpdate(request.body)
        return result
      }else{
        reply.code(400).send()
      }
    }else{
      reply.code(400).send()
    }
  });

  app.addHook("onSend", (request,reply,payload,done) =>{
    if(reply.statusCode>=300){
      const err = null
      const response = errorHandler(reply.statusCode,"Persona");
      done(err, response.error)
    }else{
      done()
    }
  });

}

export default router;
