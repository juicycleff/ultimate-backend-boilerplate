import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RequestAccountRecoveryCommand } from '../impl';
import { AccountsService } from '../../accounts.service';

@CommandHandler(RequestAccountRecoveryCommand)
export class RequestAccountRecoveryHandler
  implements ICommandHandler<RequestAccountRecoveryCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private readonly accountService: AccountsService) {}

  execute(command: RequestAccountRecoveryCommand): Promise<boolean> {
    return this.accountService.requestAccountRecovery(command.email, command.token);
  }
}
