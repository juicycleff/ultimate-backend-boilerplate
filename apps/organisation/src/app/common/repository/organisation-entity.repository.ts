import { EntityRepository } from '@mikro-orm/postgresql';
import { OrganisationEntity } from '../entities';
import { Repository } from '@mikro-orm/core';

@Repository(OrganisationEntity)
export class OrganisationEntityRepository extends EntityRepository<OrganisationEntity> {}
