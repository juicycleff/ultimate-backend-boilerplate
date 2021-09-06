import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateOrganisationCommand } from '../../impl';
import { OrganisationEntityRepository } from '../../../repository';
import { OrganisationEntity } from '../../../entities';
import { InjectRepository } from '@ub-boilerplate/common/database/mikro-orm';

@CommandHandler(CreateOrganisationCommand)
export class CreateOrganisationHandler
  implements ICommandHandler<CreateOrganisationCommand>
{
  constructor(
    @InjectRepository(OrganisationEntity)
    private readonly repository: OrganisationEntityRepository,
  ) {}

  async execute(command: CreateOrganisationCommand): Promise<string> {
    return 'Hello Command';
  }
}
