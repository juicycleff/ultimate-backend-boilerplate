import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateAccountCommand } from '../impl';
import { AccountsService } from '../../accounts.service';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly accountService: AccountsService) {}

  execute(command: CreateAccountCommand): Promise<any> {
    return this.accountService.create(command.cmd);
  }
}
