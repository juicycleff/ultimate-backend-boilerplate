import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { AccountIdentity, Identity, KratosService } from '@ub-boilerplate/common';
import { PasswordService } from '../password/password.service';
import {
  AccountResponse,
  CreateAccountRequest,
  UpdateAccountPasswordRequest,
  UpdateAccountRequest,
} from './dtos';
import { FeaturesConfig } from '../common/guardian.config';
import { UserProfileRepository } from '@ub-boilerplate/persistence';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AccountsService {
  @ConfigValue('features', {})
  featuresConfig: FeaturesConfig;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly kratos: KratosService,
    private readonly sessionsService: SessionsService,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async create(cmd: CreateAccountRequest): Promise<AccountResponse> {
    try {
      const { password } = cmd;
      if (!cmd.email && !cmd.username && !cmd.phoneNumber) {
        throw new BadRequestException(
          'email, phone number or username field must be provided',
        );
      }

      const rsp = await this.kratos.passwordRegistration(
        {
          email: cmd.email,
          name: {
            first: cmd.firstName,
            last: cmd.lastName,
          },
        },
        password,
      );
      await this.userProfileRepository.createUser({
        data: { accountId: rsp.id },
      });
      return rsp;
    } catch (e) {
      return e;
    }
  }

  async isAvailable(value: string): Promise<boolean> {
    try {
      return false;
    } catch (e) {
      return false;
    }
  }

  async update(sessionId: string, cmd: UpdateAccountRequest): Promise<AccountIdentity> {
    const payload: Partial<any> = {};

    if (cmd.phoneNumber) {
      payload.phoneNumber = `${cmd.phoneNumber.prefix}-${cmd.phoneNumber.digit}`;
    }

    if (cmd.email) {
      payload.email = cmd.email;
    }

    if (cmd.username) {
      payload.username = cmd.username;
    }

    return this.kratos.updateProfile(sessionId, payload);
  }

  async requestAccountRecovery(email: string, token?: string): Promise<boolean> {
    const resp = await this.kratos.accountRecovery(email, token);
    return !!resp;
  }

  async updatePassword(
    identity: Identity,
    cmd: UpdateAccountPasswordRequest,
    ctx: any,
  ): Promise<boolean> {
    if (cmd.password !== cmd.confirmPassword)
      throw new BadRequestException('password does not match confirmation');
    // const acct = await identity.account();

    // eslint-disable-next-line no-useless-catch
    try {
      await this.kratos.updatePassword(identity.sessionId, cmd.password);
      await this.sessionsService.delete(identity, ctx);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async verifyAccount(email: string, token: string): Promise<boolean> {
    const resp = await this.kratos.verifyAccount(email, token);
    return !!resp;
  }

  async delete(identity: Identity): Promise<boolean> {
    return false;
  }
}
