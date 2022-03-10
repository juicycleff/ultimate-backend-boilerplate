import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Identity } from '../auth';

export interface IExpressRequest extends ExpressRequest {
  identity: Identity;
  session?: Record<string, any> & any;
}

export interface IExpressResponse extends ExpressResponse {
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
  req?: Partial<IFastifyRequest | IExpressRequest>;
  request?: Partial<IFastifyRequest | IExpressRequest>;
  reply?: IFastifyReply | IExpressResponse;
  res?: IFastifyReply | IExpressResponse;
}
