import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { KratosService } from '@ub-boilerplate/common';
import { GetAccountQuery } from '../impl';

@QueryHandler(GetAccountQuery)
export class GetAccountHandler implements IQueryHandler<GetAccountQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly kratos: KratosService) {}

  async execute(command: GetAccountQuery): Promise<any> {
    return await this.kratos.whoami(command.sessionId);
  }
}
