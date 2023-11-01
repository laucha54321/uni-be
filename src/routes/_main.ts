import * as fastify from "fastify";

import authRouter from "./auth";
import cursoRouter from "./curso";
import cursoPersonaRouter from "./cursoPersona";
import notaRouter from "./nota";
import personaRouter from "./persona";

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
