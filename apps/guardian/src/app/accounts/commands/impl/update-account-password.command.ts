import { ICommand } from '@nestjs/cqrs';
import { UpdateAccountPasswordRequest } from '../../dtos';
import { Identity } from '@ub-boilerplate/common';

export class UpdateAccountPasswordCommand implements ICommand {
  constructor(
    public readonly identity: Identity,
    public readonly cmd: UpdateAccountPasswordRequest,
    public readonly ctx: any,
  ) {}
}
