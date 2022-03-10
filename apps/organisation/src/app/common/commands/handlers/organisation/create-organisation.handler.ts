import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrganisationCommand } from '../../impl';

@CommandHandler(CreateOrganisationCommand)
export class CreateOrganisationHandler
  implements ICommandHandler<CreateOrganisationCommand>
{
  async execute(command: CreateOrganisationCommand): Promise<string> {
    return 'Hello Command';
  }
}
