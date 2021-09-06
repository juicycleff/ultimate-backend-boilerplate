import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '@ub-boilerplate/common/database';
import { OrganisationEntityRepository } from '../repository';

@Entity({
  tableName: 'organisations',
})
export class OrganisationEntity extends BaseEntity {
  @Property()
  path: string;

  @Property()
  name: string;

  @Property()
  slug: string;

  [EntityRepositoryType]?: OrganisationEntityRepository;
}
