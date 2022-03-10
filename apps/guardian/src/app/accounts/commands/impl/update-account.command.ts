import { ICommand } from '@nestjs/cqrs';
import { UpdateAccountRequest } from '../../dtos';

export class UpdateAccountCommand implements ICommand {
  constructor(
    public readonly sessionId: string,
    public readonly cmd: UpdateAccountRequest,
  ) {}
}
