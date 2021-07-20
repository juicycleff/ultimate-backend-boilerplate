import { ConfigStore, InjectConfigStore } from '@ultimate-backend/config';
import { DoneFuncWithErrOrRes } from 'fastify';
import { IFastifyRequest, Identity, IFastifyReply } from '../';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class IdentityMiddleware implements NestMiddleware {
  constructor(
    @InjectConfigStore() private readonly config: ConfigStore,
    private readonly boot: BootConfig,
  ) {}

  use(req: IFastifyRequest, res: IFastifyReply, next: NextFunction) {
    req.identity = new Identity(req, res, this.config, this.boot);
    next();
  }
}

export function identityMiddleware(config: ConfigStore, boot: BootConfig) {
  return (req: IFastifyRequest, res: IFastifyReply, next: DoneFuncWithErrOrRes) => {
    req.identity = new Identity(req, res, config, boot);
    next();
  };
}
