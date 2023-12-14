import * as fastify from "fastify";

import authRouter from "./api/auth.routes";
import cursoRouter from "./api/curso.routes";
import cursoPersonaRouter from "./api/cursoPersona.routes";
import notaRouter from "./api/nota.routes";
import personaRouter from "./api/persona.routes";
import profesorRouter from "./api/profesor.routes";
import { validateToken } from "../db/functions/auth.function";
import { Value } from "@sinclair/typebox/value";
import { Type, Static } from "@sinclair/typebox";

const tokenSchema = Type.Object({
  id: Type.String(),
  iat: Type.Number(),
  exp: Type.Number(),
});

const id = Type.String({
  minLength: 36,
  maxLength: 36,
});

type t = Static<typeof id>;

async function router(app: fastify.FastifyInstance, opts: any, done: any) {
  app.decorateRequest("userid", null);
  app.addHook("onRequest", (request, reply, done) => {
    if (request.headers["authorization"]) {
      const authHeader = request.headers["authorization"];
      const token = authHeader?.split(" ")[1];
      if (token) {
        validateToken(token)
          .then((aux) => {
            if (Value.Check(tokenSchema, aux)) {
              request.headers.userid = aux.id;
              done();
            } else {
              reply.code(400).send({
                error: "Formato de Datos de token Incorrecto",
                code: 400,
                mensaje:
                  "Para mas informacion: https://documenter.getpostman.com/view/21376738/2s9YeD9DWL#",
              });
            }
          })
          .catch((error) => {
            if (error.message == "jwt expired") {
              reply.code(403).send({
                error: "El token expiro.",
                code: 403,
                mensaje:
                  "Para mas informacion: https://documenter.getpostman.com/view/21376738/2s9YeD9DWL#",
              });
            } else {
              reply.code(400).send({
                error: error,
                code: 400,
                mensaje:
                  "Para mas informacion: https://documenter.getpostman.com/view/21376738/2s9YeD9DWL#",
              });
            }
          });
      } else {
        reply.code(400).send({
          error: "Formato de Datos de token Incorrecto",
          code: 400,
          mensaje:
            "Para mas informacion: https://documenter.getpostman.com/view/21376738/2s9YeD9DWL#",
        });
      }
    } else {
      done();
    }
  });
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
  app.register(profesorRouter, {
    prefix: "/profesor",
  });
  done();
}

export default router;
