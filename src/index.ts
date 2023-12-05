import { fastify } from "fastify";
import router from "./routes/main";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";
const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(router);

const start = async () => {
  try {
    await app.register(cors, {
      origin: true,
    });
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
