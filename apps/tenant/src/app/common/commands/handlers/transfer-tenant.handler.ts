import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { TransferTenantCommand } from "../impl";

@CommandHandler(TransferTenantCommand)
export class TransferTenantHandler
  implements ICommandHandler<TransferTenantCommand> {
  async execute(command: TransferTenantCommand): Promise<string> {
    return "Hello Command";
  }
}
