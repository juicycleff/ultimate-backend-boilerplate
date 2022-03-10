import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateSessionCommand } from '../impl';
import { SessionsService } from '../../sessions.service';
import { SessionResponse } from '../../dtos';

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly sessionService: SessionsService) {}

  execute(command: CreateSessionCommand): Promise<SessionResponse> {
    return this.sessionService.create(command.cmd, command.identity, command.ctx);
  }
}
