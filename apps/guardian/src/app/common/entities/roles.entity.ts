import { Entity, Property, Index, OneToOne } from '@mikro-orm/core';
import { IsolatedEntity } from '@ub-boilerplate/common/database';
import { OsoClass } from '@ultimate-backend/permissions';

@Entity({
  tableName: 'guardian_roles',
})
@Index({ properties: ['name', 'organisationName'] })
@OsoClass({ name: 'Role' })
export class RolesEntity extends IsolatedEntity {
  @OneToOne({ nullable: true, onDelete: 'set null' })
  inherit?: RolesEntity;

  @Property()
  path: string;

  @Property()
  name: string;
}
