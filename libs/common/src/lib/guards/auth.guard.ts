import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isPlainObject } from '@nestjs/common/utils/shared.utils';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SecureHandlerOptions, SECURE_KEY } from '../decorators';
import { GqlContext, IFastifyRequest } from '../request/gql.context';
import { Identity } from '../auth';
import { ConfigStore, InjectConfigStore } from '@ultimate-backend/config';
import { BootConfig } from '@ultimate-backend/bootstrap';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectConfigStore() private readonly config: ConfigStore,
    private readonly boot: BootConfig,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secureOptions = this.reflector.get<SecureHandlerOptions>(
      SECURE_KEY,
      context.getHandler(),
    );

    const ctx = GqlExecutionContext.create(context).getContext<GqlContext>();
    if (isPlainObject(ctx)) {
      ctx.req.identity = new Identity(
        ctx.req as any,
        (ctx.reply ?? ctx.res) as any,
        this.config,
        this.boot,
      );
    } else {
      context.switchToHttp().getRequest().identity = new Identity(
        context.switchToHttp().getRequest() as any,
        context.switchToHttp().getResponse() as any,
        this.config,
        this.boot,
      );
    }

    if (!secureOptions) {
      return true;
    }

    if (isPlainObject(ctx)) {
      return await AuthGuard.verifyCurrentSession(ctx.req as any, secureOptions);
    }

    return await AuthGuard.verifyCurrentSession(
      context.switchToHttp().getRequest(),
      secureOptions,
    );
  }

  private static async verifyCurrentSession(
    req: IFastifyRequest,
    opts: SecureHandlerOptions,
  ): Promise<boolean> {
    const identity = req.identity;

    if (!identity) return false;
    if (!identity.accountID) return false;
    // if ((await identity.isService()) && opts.claim === "account") return false;
    // if (!(await identity.isService()) && opts.claim === "service") return false;

    return true;
  }
}
