import { EntityRepository } from '@mikro-orm/postgresql';
import { Repository } from '@mikro-orm/core';
import { OrganisationMemberEntity } from '../entities';

@Repository(OrganisationMemberEntity)
export class OrganisationMemberRepository extends EntityRepository<OrganisationMemberEntity> {}
