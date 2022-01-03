import {inspect} from 'util';

export async function handler(request = null) {
  return {statusCode: 200, body: inspect({Message: 'Pong!', request})};
}
