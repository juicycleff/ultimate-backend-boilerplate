import { Entity } from '@mikro-orm/core';
import { IsolatedEntity } from '@ub-boilerplate/common/database';
import { OsoClass } from '@ultimate-backend/permissions';

@Entity({
  tableName: 'guardian_permissions',
})
@OsoClass({ name: 'Permission' })
export class PermissionEntity extends IsolatedEntity {}
