import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateAccountCommand } from '../impl';
import { AccountsService } from '../../accounts.service';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler implements ICommandHandler<UpdateAccountCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly accountService: AccountsService) {}

  execute(command: UpdateAccountCommand): Promise<any> {
    return this.accountService.update(command.sessionId, command.cmd);
  }
}
