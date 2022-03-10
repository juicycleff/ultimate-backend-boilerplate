import { OsoClass } from '@ultimate-backend/permissions';

@OsoClass({ name: 'Role' })
export class RolesEntity {
  inherit?: RolesEntity;

  path: string;

  name: string;
}
