import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateAccountPasswordCommand } from '../impl';
import { AccountsService } from '../../accounts.service';

@CommandHandler(UpdateAccountPasswordCommand)
export class UpdateAccountPasswordHandler
  implements ICommandHandler<UpdateAccountPasswordCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private readonly accountService: AccountsService) {}

  execute(command: UpdateAccountPasswordCommand): Promise<any> {
    return this.accountService.updatePassword(command.identity, command.cmd, command.ctx);
  }
}
