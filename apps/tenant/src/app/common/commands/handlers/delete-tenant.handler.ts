import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { DeleteTenantCommand } from "../impl";

@CommandHandler(DeleteTenantCommand)
export class DeleteTenantHandler
  implements ICommandHandler<DeleteTenantCommand> {
  async execute(command: DeleteTenantCommand): Promise<string> {
    return "Hello Command";
  }
}
