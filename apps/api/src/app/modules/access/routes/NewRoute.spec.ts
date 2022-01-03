import NewRoute from "./NewRoute";
import {Methods} from "../../../types/Methods";

describe('Access Module - Route - New', () => {

  beforeEach(() => {
  });
  afterEach(() => {
  });

  it('Route is the same path', () => {
    expect(NewRoute).toMatchObject({
      ...NewRoute,
      method: Methods.get,
      path: '/new',
    });
  });

  it('Route handler works', async () => {
    const response = await NewRoute.handler(null, null);
    expect(response).toMatchObject({
      statusCode: 200
    });
  });
});
