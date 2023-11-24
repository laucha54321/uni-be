import * as fastify from "fastify";

import authRouter from "./api/auth.routes";
import cursoRouter from "./api/curso.routes";
import cursoPersonaRouter from "./api/cursoPersona.routes";
import notaRouter from "./api/nota.routes";
import personaRouter from "./api/persona.routes";
import errorRouter from "./errorRouter";

async function router(app: fastify.FastifyInstance) {
  app.register(authRouter, {
    prefix: "/auth",
  });
  app.register(cursoRouter, {
    prefix: "/curso",
  });
  app.register(cursoPersonaRouter, {
    prefix: "/curso_persona",
  });
  app.register(notaRouter, {
    prefix: "/nota",
  });
  app.register(personaRouter, {
    prefix: "/persona",
  });
}


export default router;
