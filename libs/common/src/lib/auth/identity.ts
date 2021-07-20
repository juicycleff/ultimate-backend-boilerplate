import { ConfigStore } from '@ultimate-backend/config';
import { Request as ExpressRequest } from 'express';
import { SecurityConfig } from './auth.config';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { IFastifyReply, IFastifyRequest } from '../request';
import { AccountIdentity } from './account.type';

export class Identity {
  constructor(
    private req: ExpressRequest | IFastifyRequest,
    private reply: IFastifyReply,
    private readonly config: ConfigStore,
    private readonly boot: BootConfig,
  ) {}

  get accountID(): string {
    return this.req.cookies.idtoken;
  }

  get sessionId(): string {
    return this.req.cookies.idtoken;
  }

  async account(): Promise<AccountIdentity> {
    return this.getClaim();
  }

  async isService(): Promise<boolean> {
    return false;
  }

  forget(reply: IFastifyReply): any {
    reply.clearCookie((this.config.get('security') as SecurityConfig).cookieId);
  }

  remember(token: string, reply: IFastifyReply): void {
    reply.setCookie(
      (this.config.get('security') as SecurityConfig).cookieId,
      token,
      this.boot.get('setup.cookie', null),
    );
  }

  private async getClaim(): Promise<any> {
    return null;
  }
}
