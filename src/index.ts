import { fastify } from "fastify";
import router from "./routes/main";
import errorRouter from "./routes/errorRouter"



const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

app.register(router);
app.register(errorRouter);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
