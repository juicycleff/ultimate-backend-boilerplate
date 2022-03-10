import { ICommand } from '@nestjs/cqrs';
import { Identity } from '@ub-boilerplate/common';

export class DeleteSessionCommand implements ICommand {
  constructor(public readonly identity: Identity, public readonly ctx: any) {}
}
