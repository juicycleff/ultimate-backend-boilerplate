import { DeleteOrganisationHandler } from './delete-organisation.handler';
import { CreateOrganisationHandler } from './create-organisation.handler';
import { TransferOrganisationHandler } from './transfer-organisation.handler';
import { UpdateOrganisationHandler } from './update-organisation.handler';

export {
  DeleteOrganisationHandler,
  CreateOrganisationHandler,
  TransferOrganisationHandler,
  UpdateOrganisationHandler,
};

export const OrganisationCommandHandlers = [
  DeleteOrganisationHandler,
  CreateOrganisationHandler,
  TransferOrganisationHandler,
  UpdateOrganisationHandler,
];
