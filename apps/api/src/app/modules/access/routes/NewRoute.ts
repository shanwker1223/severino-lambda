import Route from '../../../types/Route';
import {Methods} from '../../../types/Methods';
import {FastifyReply, FastifyRequest} from 'fastify';
import {handler} from "../handlers/NewKeyHandler";

const route: Route = {
  method: Methods.get,
  path: '/new',
  opts: {},
  handler(request?: FastifyRequest, reply?: FastifyReply) {
    return handler(request);
  }
};

export default route;
