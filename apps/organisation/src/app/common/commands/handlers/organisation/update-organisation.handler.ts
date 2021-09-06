import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateOrganisationCommand } from '../../impl';

@CommandHandler(UpdateOrganisationCommand)
export class UpdateOrganisationHandler
  implements ICommandHandler<UpdateOrganisationCommand>
{
  async execute(command: UpdateOrganisationCommand): Promise<string> {
    return 'Hello Command';
  }
}
