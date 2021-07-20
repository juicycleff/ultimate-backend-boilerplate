import { Request as ExpressRequest } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Identity } from '../auth';

export interface IRequest extends ExpressRequest {
  identity: Identity;
}

export interface IFastifyRequest extends FastifyRequest {
  identity: Identity;
  cookies: Record<string, string> & { idtoken: string };
  raw: FastifyRequest['raw'] & { identity?: Identity };
}

export interface IFastifyReply extends FastifyReply {
  setCookie: (key: string, value: string, options?: any) => void;
  cookies: Record<string, string> & { idtoken?: string };
  clearCookie: (cookie: string, options?: any) => void;
}

export interface GqlContext {
  connection?: any;
  req?: Partial<IFastifyRequest>;
  request?: Partial<IFastifyRequest>;
  reply?: IFastifyReply;
}
