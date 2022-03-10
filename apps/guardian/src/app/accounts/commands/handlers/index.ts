import { CreateAccountHandler } from './create-account.handler';
import { UpdateAccountHandler } from './update-account.handler';
import { VerifyAccountHandler } from './verify-account.handler';
import { UpdateAccountPasswordHandler } from './update-account-password.handler';
import { RequestAccountRecoveryHandler } from './request-account-recovery.handler';

export const AccountCommandHandlers = [
  CreateAccountHandler,
  UpdateAccountHandler,
  VerifyAccountHandler,
  RequestAccountRecoveryHandler,
  UpdateAccountPasswordHandler,
];
