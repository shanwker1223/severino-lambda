import {handler} from './NewKeyHandler'

describe('Access Module - Handler - New', () => {

  beforeEach(() => {
  });
  afterEach(() => {
  });

  it('Handler with sample request', async () => {
    const response = await handler();
    expect(response).toMatchObject({
      statusCode: 200
    });
  });
});
