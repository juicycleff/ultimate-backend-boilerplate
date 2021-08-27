import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { AccountIdentity, Identity, KratosService } from '@ub-boilerplate/common';
import { PasswordService } from '../password/password.service';
import { CreateAccountRequest, UpdateAccountRequest } from './commands';
import { FeaturesConfig } from '../common/guardian.config';

@Injectable()
export class AccountsService {
  @ConfigValue('features', {})
  featuresConfig: FeaturesConfig;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly kratos: KratosService,
  ) {}

  async create(cmd: CreateAccountRequest): Promise<any> {
    const { password } = cmd;

    if (!cmd.email && !cmd.username && !cmd.phoneNumber) {
      throw new BadRequestException(
        'email, phone number or username field must be provided',
      );
    }

    return await this.kratos.passwordRegistration(
      {
        email: cmd.email,
        name: {
          first: cmd.firstName,
          last: cmd.lastName,
        },
      },
      password,
    );
  }

  async isAvailable(value: string): Promise<boolean> {
    try {
      return false;
    } catch (e) {
      return false;
    }
  }

  async passwordExpire(sessionId: string): Promise<boolean> {
    return false;
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

  async verifyAccount(email: string, token: string): Promise<boolean> {
    const resp = await this.kratos.verifyAccount(email, token);
    return !!resp;
  }

  async delete(identity: Identity): Promise<boolean> {
    return false;
  }
}
