import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateTenantCommand } from "../impl";

@CommandHandler(CreateTenantCommand)
export class CreateTenantHandler
  implements ICommandHandler<CreateTenantCommand> {
  async execute(command: CreateTenantCommand): Promise<string> {
    return "Hello Command";
  }
}
