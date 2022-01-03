import {Application} from "./Application";
import Module from "./Module";
import Route from "../types/Route";
import {Methods} from "../types/Methods";

describe('Application Tests', () => {
  const sampleResponse = 'Sample!';
  let sampleRoute: Route, sampleModule: Module;

  beforeEach(() => {
    sampleRoute = {
      method: Methods.get,
      opts: {},
      path: '/sample',
      handler() {
        return sampleResponse;
      }
    }
    sampleModule = new Module('/module', [sampleRoute]);
  });
  afterEach(() => {
    expect(Application.destroy()).toBeTruthy();
  });

  it('Application should start only once', async () => {
    const app = await Application.getInstance();
    const app2 = await Application.getInstance();
    expect(app === app2).toBeTruthy();
  });

  it('Application creation with Module', async () => {
    const app = await Application.getInstance([sampleModule]);
    expect(app.fastify).toBeInstanceOf(Object);
  });

  it('Application should start fastify', async () => {
    const app = await Application.getInstance();
    expect(app.fastify).toBeInstanceOf(Object);
  });

  it('Application listens with error', async () => {
    const app = await Application.getInstance();
    const error = new Error('Erro ao iniciar fastify');
    const fastifyListen = jest.spyOn(app.fastify, 'listen').mockImplementation(() => {
      throw error;
    });
    expect(() => app.listen()).toThrow(error);
    expect(fastifyListen).toHaveBeenCalledTimes(1);
  });

  it('Application error during listen', async () => {
    const app = await Application.getInstance();
    const error = new Error('Erro ao iniciar fastify');
    const fastifyListen = jest.spyOn(app.fastify, 'listen')
      .mockImplementation(
        // @ts-ignore
        function (port: number | string, callback: (err: Error | null, address: string) => void): void {
          callback(error, '127.0.0.1');
        }
      );
    expect(() => app.listen()).toThrow(error);
    expect(fastifyListen).toHaveBeenCalledTimes(1);
  });

  it('Application fastify listens', async () => {
    const app = await Application.getInstance();
    const fastifyListen = jest.spyOn(app.fastify, 'listen').mockImplementation(
      // @ts-ignore
      function (port: number | string, callback: (err: Error | null, address: string) => void): void {
        callback(null, '127.0.0.1');
      });
    expect(() => app.listen()).not.toThrow();
    expect(fastifyListen).toHaveBeenCalledTimes(1);
  });

  it('Application invoke route', async () => {
    const app = await Application.getInstance();
    app.registerModule(sampleModule);
    const response = await app.inject(
      Methods.get,
      '/module/sample'
    );
    expect(response).toMatchObject({
      statusCode: 200,
      body: sampleResponse
    })
  });
});
