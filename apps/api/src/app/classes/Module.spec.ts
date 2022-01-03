import {Application} from "./Application";
import Module from "./Module";
import Route from "../types/Route";
import {Methods} from "../types/Methods";

describe('Module Tests', () => {
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

  it('Module can register in application', async () => {
    const app = await Application.getInstance();
    expect(() => app.registerModule(sampleModule)).not.toThrow();
    expect(app.routes.map((route: Route) => route.path)).toEqual(expect.arrayContaining(sampleModule.routes.map((route: Route) => route.path)))
  });
});
