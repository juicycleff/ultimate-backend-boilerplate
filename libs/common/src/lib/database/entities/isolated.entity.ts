import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ abstract: true })
export abstract class IsolatedEntity extends BaseEntity {
  @Property()
  organisationName: string;
}
