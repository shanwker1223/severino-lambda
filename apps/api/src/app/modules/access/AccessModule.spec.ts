import AccessModule from "./AccessModule";
import {Application} from "../../classes/Application";
import Route from "../../types/Route";

describe('Access Module Tests', () => {

  beforeEach(() => {
  });
  afterEach(() => {
  });

  it('AccessModule has same base route', () => {
    expect(AccessModule.baseRoute).toMatchSnapshot();
  });

  it('AccessModule has same routes', () => {
    expect(AccessModule.routes).toMatchSnapshot();
  });

  it('AccessModule registers correctly', async () => {
    const app = await Application.getInstance();

    const registrationFunction = jest.spyOn(app, 'registerRoute');
    AccessModule.register(app);

    expect(app.routes).toMatchSnapshot();

    expect(registrationFunction).toHaveBeenCalledTimes(AccessModule.routes.length);
    AccessModule.routes.forEach((route: Route, index: number) => {
      expect(registrationFunction).toHaveBeenNthCalledWith(index+1, AccessModule, route);
    });

    Application.destroy(); // To prevent application leaks, since it's an singleton
  });
});
