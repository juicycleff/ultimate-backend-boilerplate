import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { DeleteSessionCommand } from '../impl';
import { SessionsService } from '../../sessions.service';

@CommandHandler(DeleteSessionCommand)
export class DeleteSessionHandler implements ICommandHandler<DeleteSessionCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly sessionService: SessionsService) {}

  execute(command: DeleteSessionCommand): Promise<boolean> {
    return this.sessionService.delete(command.identity, command.ctx);
  }
}
