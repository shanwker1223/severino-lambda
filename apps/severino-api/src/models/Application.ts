import fastify, { FastifyServerOptions } from 'fastify';
import { FastifyInstance } from 'fastify/types/instance';

class Application {
  protected static _app: Application;

  protected fastify: FastifyInstance;

  protected constructor() {
    const fastifyOptions: FastifyServerOptions = { logger: true };
    this.fastify = fastify(fastifyOptions);
    this.fastify.get('/', async () => {
      return 'pong\n';
    });
  }

  public static getInstance(): Application {
    if (typeof Application._app === 'undefined') {
      Application._app = new Application();
    }
    return Application._app;
  }

  public listen(): void {
    this.fastify.listen(
      8080,
      (err, address) => this.serverHandler(err, address)
    );
  }

  protected serverHandler(err: Error, address: string) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
}

export {
  Application
};
