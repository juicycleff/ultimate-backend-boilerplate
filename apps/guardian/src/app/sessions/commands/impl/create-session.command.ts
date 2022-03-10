import { ICommand } from '@nestjs/cqrs';
import { Identity } from '@ub-boilerplate/common';
import { CreateSessionRequest } from '../../dtos';

export class CreateSessionCommand implements ICommand {
  constructor(
    public readonly cmd: CreateSessionRequest,
    public readonly identity: Identity,
    public readonly ctx: any,
  ) {}
}
