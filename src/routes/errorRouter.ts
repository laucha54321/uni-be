import * as fastify from "fastify";

async function router(app: fastify.FastifyInstance) {
    console.log('jhasdk')
    app.all("",async (request, reply) => {
        console.log("Error:", reply.statusCode)
        switch(reply.statusCode){
            case 400:
                return {error:"Formato de Datos Incorrecto"};
            case 404:
                return {error:"No existe"};
            default:
                return {error:"Ocurrio un Error"}
        }
    })
}

export default router;