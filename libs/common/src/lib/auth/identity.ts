import { ConfigStore } from '@ultimate-backend/config';
import { Request as ExpressRequest } from 'express';
import { SecurityConfig } from './auth.config';
import { BootConfig } from '@ultimate-backend/bootstrap';
import {
  GqlContext,
  IExpressRequest,
  IExpressResponse,
  IFastifyReply,
  IFastifyRequest,
} from '../request';
import { AccountIdentity } from './account.type';

export class Identity {
  constructor(
    private req: ExpressRequest | IFastifyRequest,
    private reply: IFastifyReply,
    private readonly config: ConfigStore,
    private readonly boot: BootConfig,
  ) {}

  get accountID(): string {
    return this.getId();
  }

  get sessionId(): string {
    return this.getId();
  }

  getId() {
    const secConfig = this.config.get('security') as SecurityConfig;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.req.session && this.req.session[secConfig.cookieId])
      return this.req.session[secConfig.cookieId];
    if (this.req.cookies[secConfig.cookieId]) return this.req.cookies[secConfig.cookieId];
    const authToken = (this.req.headers['Authorization'] ??
      this.req.headers['authorization']) as string;
    if (authToken && authToken.startsWith('Bearer ')) {
      return authToken.substr(7, authToken.length);
    }
    return undefined;
  }

  async account(): Promise<AccountIdentity> {
    return this.getClaim();
  }

  async isService(): Promise<boolean> {
    return false;
  }

  forget(ctx: GqlContext): any {
    const secConfig = this.config.get('security') as SecurityConfig;
    if (ctx.reply && 'clearCookie' in ctx.reply) {
      ctx.reply.clearCookie((this.config.get('security') as SecurityConfig).cookieId);
    } else if (ctx.req && 'session' in ctx.req) {
      ctx.req.session[secConfig.cookieId] = null;
    }
  }

  remember(token: string, ctx: GqlContext | any): void {
    const secConfig = this.config.get('security') as SecurityConfig;
    if (ctx.reply && 'setCookie' in ctx.reply) {
      ctx.reply.setCookie(secConfig.cookieId, token, this.boot.get('setup.cookie', null));
    } else if (ctx.req && 'session' in ctx.req) {
      ctx.req.session[secConfig.cookieId] = token;
    }
  }

  private async getClaim(): Promise<any> {
    return null;
  }
}
