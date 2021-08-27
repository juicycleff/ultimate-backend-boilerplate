import { Resolver } from '@nestjs/graphql';
import { RolesMutations } from './roles.types';

@Resolver(() => RolesMutations)
export class RolesMutationsResolver {}
