import { fastify } from "fastify";
import router from "./routes/main";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'


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
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
