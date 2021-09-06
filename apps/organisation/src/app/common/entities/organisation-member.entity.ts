import { Entity } from '@mikro-orm/core';
import { IsolatedEntity } from '@ub-boilerplate/common/database';

@Entity({
  tableName: 'organisation-members',
})
export class OrganisationMemberEntity extends IsolatedEntity {}
