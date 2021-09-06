import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteOrganisationCommand } from '../../impl';

@CommandHandler(DeleteOrganisationCommand)
export class DeleteOrganisationHandler
  implements ICommandHandler<DeleteOrganisationCommand>
{
  async execute(command: DeleteOrganisationCommand): Promise<string> {
    return 'Hello Command';
  }
}
