import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { VerifyAccountCommand } from '../impl';
import { AccountsService } from '../../accounts.service';

@CommandHandler(VerifyAccountCommand)
export class VerifyAccountHandler implements ICommandHandler<VerifyAccountCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly accountService: AccountsService) {}

  execute(command: VerifyAccountCommand): Promise<boolean> {
    return this.accountService.verifyAccount(command.email, command.token);
  }
}
