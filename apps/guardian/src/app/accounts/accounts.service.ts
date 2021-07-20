import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { PasswordService } from '../password/password.service';
import { CreateAccountRequest, UpdateAccountRequest } from './commands';
import { FeaturesConfig } from '../common/guardian.config';
import { Identity, KratosService } from '@ub-boilerplate/common';

@Injectable()
export class AccountsService {
  @ConfigValue('features', {})
  featuresConfig: FeaturesConfig;

  constructor(
    private readonly passwordService: PasswordService,
    private readonly kratos: KratosService,
  ) {}

  async create(cmd: CreateAccountRequest): Promise<any> {
    const { password, confirmPassword, username, phoneNumber: digits, ...rest } = cmd;

    if (!cmd.email && !cmd.username && !cmd.phoneNumber) {
      throw new BadRequestException(
        'email, phone number or username field must be provided',
      );
    }

    let phoneNumber;
    if (digits) {
      phoneNumber = `${digits.prefix}-${digits.digit}`;
    }

    return await this.kratos.passwordRegistration({ ...rest }, password);
  }

  async isAvailable(value: string): Promise<boolean> {
    try {
      return false;
    } catch (e) {
      return false;
    }
  }

  async passwordExpire(accountID: string): Promise<boolean> {
    return false;
  }

  async update(accountID: string, cmd: UpdateAccountRequest): Promise<any> {
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

    return null;
  }

  async lock(accountID: string): Promise<boolean> {
    return false;
  }

  async unlock(accountID: string): Promise<boolean> {
    return false;
  }

  async delete(identity: Identity): Promise<boolean> {
    return false;
  }
}
