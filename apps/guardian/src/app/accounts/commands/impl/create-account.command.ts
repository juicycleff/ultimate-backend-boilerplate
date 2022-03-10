import { ICommand } from '@nestjs/cqrs';
import { CreateAccountRequest } from '../../dtos';

export class CreateAccountCommand implements ICommand {
  constructor(public readonly cmd: CreateAccountRequest) {}
}
