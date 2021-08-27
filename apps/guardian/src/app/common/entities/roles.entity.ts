import { Entity } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({
  tableName: 'roles',
})
export class RolesEntity extends BaseEntity {}
