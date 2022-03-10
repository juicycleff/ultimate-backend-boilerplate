import { Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { CreateSessionRequest, SessionResponse } from './dtos';
import { Identity, KratosService, GqlContext } from '@ub-boilerplate/common';
import { FeaturesConfig } from '../common/guardian.config';

@Injectable()
export class SessionsService {
  @ConfigValue('features', {})
  featuresConfig: FeaturesConfig;

  constructor(private readonly kratos: KratosService) {}

  /**
   * @description this method creates a session for an account
   * @param cmd
   * @param identity
   * @param ctx
   */
  async create(
    cmd: CreateSessionRequest,
    identity: Identity,
    ctx: GqlContext,
  ): Promise<SessionResponse> {
    const rsp = await this.kratos.passwordLogin(cmd.identity, cmd.password);
    const accountToken = rsp.session_token;

    if (this.featuresConfig.auth.enableSession) {
      identity.remember(accountToken, ctx);
    }

    return {
      idToken: this.featuresConfig.auth.enableJwt ? accountToken : null,
      ...rsp.session,
    };
  }

  /**
   * @description delete account session
   * @param identity
   * @param ctx
   */
  async delete(identity: Identity, ctx: GqlContext): Promise<boolean> {
    identity.forget(ctx);
    await this.kratos.logout(identity.sessionId);
    return true;
  }
}
