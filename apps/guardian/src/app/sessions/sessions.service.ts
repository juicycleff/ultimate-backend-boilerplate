import { Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { RedisClient } from '@ultimate-backend/redis';
import { PasswordService } from '../password/password.service';
import { CreateSessionRequest } from './commands';
import { SessionResponse } from './queries';
import { Identity, IFastifyReply, KratosService } from '@ub-boilerplate/common';
import { FeaturesConfig } from '../common/guardian.config';

@Injectable()
export class SessionsService {
  @ConfigValue('features', {})
  featuresConfig: FeaturesConfig;

  constructor(
    private readonly kratos: KratosService,
    private readonly passwordService: PasswordService,
    private readonly redis: RedisClient,
  ) {}

  /**
   * @description this method creates a session for an account
   * @param cmd
   * @param identity
   * @param ipAddress
   */
  async create(
    cmd: CreateSessionRequest,
    identity: Identity,
    reply: IFastifyReply,
  ): Promise<SessionResponse> {
    const rsp = await this.kratos.passwordLogin(cmd.identity, cmd.password);
    const accountToken = rsp.session_token;

    if (this.featuresConfig.auth.enableSession) {
      identity.remember(accountToken, reply);
    }

    return {
      idToken: this.featuresConfig.auth.enableJwt ? accountToken : null,
    };
  }

  /**
   * @description delete account session
   * @param identity
   */
  async delete(identity: Identity, res: IFastifyReply): Promise<boolean> {
    identity.forget(res);
    await this.kratos.logout(identity.sessionId);
    return true;
  }
}
