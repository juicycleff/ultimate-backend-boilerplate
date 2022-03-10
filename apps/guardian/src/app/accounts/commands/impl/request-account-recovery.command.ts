import { ICommand } from '@nestjs/cqrs';

export class RequestAccountRecoveryCommand implements ICommand {
  constructor(public readonly email: string, public readonly token: string) {}
}
