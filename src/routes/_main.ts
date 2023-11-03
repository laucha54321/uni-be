import * as fastify from "fastify";

import authRouter from "./auth.routes";
import cursoRouter from "./curso.routes";
import cursoPersonaRouter from "./cursoPersona.routes";
import notaRouter from "./nota.routes";
import personaRouter from "./persona.routes";

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
