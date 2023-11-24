import * as fastify from "fastify";
import { personaInsert, personaSelect } from "../../db/functions/persona.functions";
import { insertPersonasSchema} from "../../db/schema/persona.schema";
import { Value } from "@sinclair/typebox/value";
import { Type } from "@sinclair/typebox";

const id = Type.Object({
  id:Type.String()
})

const router = async (app: fastify.FastifyInstance,opts:any,done:any) => {
  app.get("/:id", async (request, reply) => {
    if(Value.Check(id,request.params)){
      const result = await personaSelect(request.params)
      if(result.length>0){
        return result
      }else{
        reply.code(404);
      }
    }else{
      reply.code(400);
    }
    done();
  });

  app.post("/", async (request, reply) => {
    if (Value.Check(insertPersonasSchema, request.body)) {
      const result = personaInsert(request.body);
      return result;
    } else {
      reply.code(400);
    }
  });
  app.patch("/", async () => {
    return { hello: "persona Router" };
  });
  app.delete("/", async () => {
    return { hello: "persona Router" };
  });
}

export default router;
