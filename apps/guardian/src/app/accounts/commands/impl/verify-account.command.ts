import { ICommand } from '@nestjs/cqrs';

export class VerifyAccountCommand implements ICommand {
  constructor(public readonly email: string, public readonly token: string) {}
}
