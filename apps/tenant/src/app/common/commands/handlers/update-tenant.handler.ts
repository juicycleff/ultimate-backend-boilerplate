import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UpdateTenantCommand } from "../impl";

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantHandler
  implements ICommandHandler<UpdateTenantCommand> {
  async execute(command: UpdateTenantCommand): Promise<string> {
    return "Hello Command";
  }
}
