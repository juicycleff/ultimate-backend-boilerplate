import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransferOrganisationCommand } from '../../impl';

@CommandHandler(TransferOrganisationCommand)
export class TransferOrganisationHandler
  implements ICommandHandler<TransferOrganisationCommand>
{
  async execute(command: TransferOrganisationCommand): Promise<string> {
    return 'Hello Command';
  }
}
