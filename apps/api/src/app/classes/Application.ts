import fastify, {FastifyReply, FastifyRequest, FastifyServerOptions} from 'fastify';
import {FastifyInstance} from 'fastify/types/instance';
import Module from './Module';
import Route from '../types/Route';
import {Methods} from '../types/Methods';
import {Response as LightMyRequestResponse} from "light-my-request";

export class Application {
  protected static _app: Application;
  private readonly _fastify: FastifyInstance;
  private readonly _routes: Array<Route> = [];

  protected constructor() {
    const fastifyOptions: FastifyServerOptions = {logger: true};
    // noinspection TypeScriptValidateTypes
    this._fastify = fastify(fastifyOptions);
  }

  protected static async createInstance(modules: Array<Module>): Promise<Application> {
    const app = new Application();
    await Promise.all(
      modules.map(async (module: Module): Promise<void> => app.registerModule(module))
    );
    return app;
  }

  protected serverHandler(err: Error, address: string): void {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`Server listening at ${address}`);
  }

  public static async getInstance(modules: Array<Module> = []): Promise<Application> {
    if (typeof Application._app === 'undefined') {
      Application._app = await Application.createInstance(modules);
    }
    return Application._app;
  }

  public listen(): void {
    try {
      return this._fastify.listen(
        8080,
        (err: Error | null, address: string): void => this.serverHandler(err, address)
      );
    } catch (err) {
      this._fastify.log.error(err);
      throw err;
    }
  }

  public registerModule(module: Module): void {
    return module.register(this);
  }

  public registerRoute(module: Module, route: Route): void {
    this._routes.push(route);
    switch (route.method) {
      case Methods.get:
        this._fastify.get(
          route.path,
          route.opts,
          (request: FastifyRequest, reply: FastifyReply) => route.handler(request, reply)
        );
    }
  }

  public async inject(method: Methods, route: string): Promise<LightMyRequestResponse> {
    return await this._fastify.inject({
      method: method,
      url: route
    });
  }

  public static destroy(): boolean {
    return delete this._app;
  }

  get fastify(): FastifyInstance {
    return this._fastify;
  }

  get routes(): Array<Route> {
    return this._routes;
  }
}
