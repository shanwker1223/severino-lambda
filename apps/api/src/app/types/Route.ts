import { Methods } from './Methods';
import { RouteShorthandOptions } from 'fastify/types/route';
import { FastifyReply, FastifyRequest } from 'fastify';

export default interface Route {
  method: Methods;
  path: string;
  opts: RouteShorthandOptions;

  handler(request: FastifyRequest, reply: FastifyReply);
}
